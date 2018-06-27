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
                  收货人：{{item.recipientName}}
                </div>
                <div class="cardItem">
                  联系方式：{{item.phoneNumber}}
                </div>
                <div class="cardItem">
                  收货地址：{{ item.province+' '+item.city+' '+ item.addressDetail}}
                </div>
              </div>

            </el-main>



            <!-- 右侧信息 -->
            <el-aside>

            <div>
              <div class="cardItem">
                  
                    <el-button v-if="item.isDefaultAddress=='1' " type="success" disabled>默认地址</el-button>
                    <el-button v-if="item.isDefaultAddress=='0' " @click="changeDefault(index)">设为默认</el-button>
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
import addAddress from "~/components/home/addAddress";
import editAddress from "~/components/home/editAddress";
import Cookies from 'js-cookie'
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
    deleteAddressItem(index) {
      // this.addressItems.splice(index, 1);
      this.$confirm( '该地址项将被移除，是否继续？' ,'提示' ,{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
      }).then( async ()=>{
        this.$message({type: 'success',message: '删除成功!'});

        let data = {
          query : "deleteAddress",
          data :{
            userId :Cookies.get('userId'),
            sessionId : Cookies.get('sessionId'),
            addressId : this.addressItems[index].addressId
          }
        }
        let response = await this.$axios.send(data)
        if(response.status===1){
          this.addressItems =  response.data.addresses
        }
        else{
          this.$message.error('发生错误：'+response.err);
        }

      }).catch( ()=>{
        this.$message({type: 'info', message: '已取消删除'});   
      })

    },
    applyAddAddress() {
      this.$refs.addAddress.$emit("openDialog");
    },
    async addAddressItem(addressItem) {
      // this.addressItems.push(addressItem);
      let data = {
        query : "addAddress",
        data :{
          userId : Cookies.get('userId'),
          sessionId :Cookies.get('sessionId'),
          recipientName : addressItem.recipientName,
          phoneNumber : addressItem.phoneNumber+"",
          addressDetail : addressItem.addressDetail,
          province : addressItem.province,
          city : addressItem.city,
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
      // this.addressItems[index].recipientName = addressItem.recipientName;
      // this.addressItems[index].phoneNumber = addressItem.phoneNumber;
      
      let data = {
        query : "editAddress",
        data :{
          userId : Cookies.get('userId'),
          sessionId : Cookies.get('sessionId'),
          recipientName : addressItem.recipientName,
          phoneNumber : addressItem.phoneNumber+"",
          addressDetail : addressItem.addressDetail,
          province : addressItem.province,
          city : addressItem.city,
          isDefaultAddress : this.addressItems[index].isDefaultAddress+"",
          addressId : this.addressItems[index].addressId+"",
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
    async changeDefault(index) {

      let data = {
        query : "editAddress",
        data :{
          userId : Cookies.get('userId'),
          sessionId : Cookies.get('sessionId'),
          recipientName : this.addressItems[index].recipientName,
          phoneNumber : this.addressItems[index].phoneNumber+"",
          addressDetail : this.addressItems[index].addressDetail,
          province : this.addressItems[index].province,
          city : this.addressItems[index].city,
          isDefaultAddress : 1+"",
          addressId : this.addressItems[index].addressId+"",
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
    async getAddress(){
      let data = {
        query : "getAddress",
        data : {
          userId : Cookies.get('userId'),
          sessionId : Cookies.get('sessionId')
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