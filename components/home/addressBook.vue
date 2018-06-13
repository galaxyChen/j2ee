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
                  收货人：{{item.usn}}
                </div>
                <div class="cardItem">
                  联系方式：{{item.contact}}
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
  data() {
    return {
      mostAddressNum: 10,
      defaultItem: 0,
      newDialogVisble: false,
      addressItems: [
        {
          usn: "Foo",
          contact: "110",
          address: "scut"
        },
        {
          usn: "Bar",
          contact: "120",
          address: "China"
        },
        {
          usn: "merlin",
          contact: "518",
          address: "avalon"
        }
      ]
    };
  },
  methods: {
    applyEditAddress(index) {
      this.$refs.editAddress[index].$emit("openDialog");
    },
    deleteAddressItem(index) {
      this.addressItems.splice(index, 1);
    },
    applyAddAddress() {
      this.$refs.addAddress.$emit("openDialog");
    },
    addAddressItem(addressItem) {
      this.addressItems.push(addressItem);
    },
    editAddressItem(index, addressItem) {
      this.addressItems[index].address = addressItem.address;
      this.addressItems[index].usn = addressItem.usn;
      this.addressItems[index].contact = addressItem.contact;
    },
    changeDefault(index) {
      this.defaultItem = index;
    }
  }
};
</script>