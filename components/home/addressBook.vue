<template>

  <el-container >
    <addAddress ref='addAddress' @submitForm="addAddressItem" ></addAddress>
    <el-header class="header">
      收货地址（最多能存{{mostAddressNum}}条,还能存{{mostAddressNum-addressItems.length}}条）
      <el-button type="text" @click="applyAddAddress">新建地址</el-button>
    </el-header>
    <el-main>
      
      <el-card v-for="(item,index) in addressItems" :key="index" class="text item">
          <editAddress ref="editAddress" :index="index" :item="item"   @submitForm="editAddressItem"></editAddress>
          <el-container>

            <!-- 左侧信息 -->
            <el-main>


              <div class="leftCard">
                <div class="cardItem">
                  收货人：{{item.name}}
                </div>
                <div class="cardItem">
                  联系方式：{{item.phone}}
                </div>
                <div class="cardItem">
                  收货地址：{{item.address}}
                </div>
              </div>

            </el-main>



            <!-- 右侧信息 -->
            <el-aside>

            <div>
              <div class="cardItem">
                  
                    <el-button v-if="defaultItem==index" type="success" disabled>默认地址</el-button>
                    <el-button v-if="defaultItem!=index" @click="changeDefault(index)">设为默认</el-button>
              </div>
              <div>
                 <el-button @click="applyEditAddress(index)" type="text">编辑</el-button>
                 <el-button @click="deleteAddressItem(index)" type="text" >删除</el-button>
              </div>
            </div>


            </el-aside>


          </el-container>

      </el-card>
    </el-main>

  </el-container>

</template>


<style scope>
.header {
  margin-top: 30px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-defaultAddress {
  background: #0d9254;
  border-radius: 4px;
}
.leftCard {
  width: 80%;
}
.rightCard {
  width: 20%;
}
.cardItem {
  margin-bottom: 2%;
  margin-top: 2%;
}
</style>


<script>
//   import Vue from 'vue';
//   import ElementUI from 'element-ui';
//   import 'element-ui/lib/theme-chalk/index.css';

//   Vue.use(ElementUI);

import addAddress from "~/components/home/addAddress";
import editAddress from "~/components/home/editAddress";
export default {
  components: {
    addAddress,
    editAddress
  },
  mounted(){
    this.getAddress();
  },
  data() {
    return {
      mostAddressNum: 10,
      defaultItem: 0,
      newDialogVisble: false,
      addressItems: []
    };
  },
  methods: {
    applyEditAddress(index) {
      this.$refs.editAddress[index].$emit("openDialog");
    },
    async deleteAddressItem(index) {
      // this.addressItems.splice(index, 1);
      let data = {
        query : "deleteAddress",
        data :{
          user_id:'',
          session_id : '',
          address_id : this.addressItems[index].address_id
        }
      }
      let response = await this.$axios.send(data)
      if(response.status===1){
        this.addressItems =  response.data.addresses
      }
      else{
        this.$message.error('发生错误：'+response.err);
      }
    },
    applyAddAddress() {
      this.$refs.addAddress.$emit("openDialog");
    },
    async addAddressItem(addressItem) {
      // this.addressItems.push(addressItem);
      let data = {
        query : "addAddress",
        data :{
          user_id:'',
          session_id : '',
          name : addressItem.name,
          phone : addressItem.phone,
          address : addressItem.address
        }
      }
      let response = await this.$axios.send(data)
      if(response.status===1){
        this.addressItems =  response.data.addresses
      }
      else{
        this.$message.error('发生错误：'+response.err);
      }
    },
    async editAddressItem(index, addressItem) {
      // this.addressItems[index].address = addressItem.address;
      // this.addressItems[index].name = addressItem.name;
      // this.addressItems[index].phone = addressItem.phone;
      
      let data = {
        query : "editAddress",
        data :{
          user_id:'',
          session_id : '',
          name : addressItem.name,
          phone : addressItem.phone,
          address : addressItem.address,
          default : this.addressItems[index].default,
          address_id : this.addressItems[index].address_id
        }
      }
      let response = await this.$axios.send(data)
      if(response.status===1){
        this.addressItems =  response.data.addresses
      }
      else{
        this.$message.error('发生错误：'+response.err);
      }
    },
    changeDefault(index) {
      this.defaultItem = index;
    },
    async getAddress(){
      let data = {
        query : "getAddress",
        data : {
          user_id : '',
          session_id : ''
        }
      }
      let response = await this.$axios.send(data)
      if(response.status===1){
        this.addressItems =  response.data.addresses
      }
      else{
        this.$message.error('发生错误：'+response.err);
      }

    }
  }
};
</script>