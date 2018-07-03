<template>
    <el-container v-if="showList">
        <el-main style="margin-top:20px;">
            <div>
                <el-tabs v-model="service" type="card" @tab-click="handleClick">
                    <el-tab-pane label="售后申请" name="first">
                       <AfterOrderDetail v-for="order in orderList" :key="order.orderId" :order="order" @applyReturn="applyBtn"></AfterOrderDetail>
                    </el-tab-pane>  

                    <el-tab-pane label="申请记录" name="second">
                        <AfterRecord  @seeDetail="applyBtn2" :afterServiceList="afterServiceList"></AfterRecord>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-main>
    </el-container>

    <el-container v-else>
        <el-header>
            <el-button @click="goBack" class="back-button" size="medium" type='text' icon="el-icon-back">返回</el-button>
        </el-header>
        
            <ApplyReturn v-if="service=='first'" style="margin-top:50px;margin-left:-100px;"></ApplyReturn>
            <AfterDetail v-if="service=='second'" :afterService="afterServiceList[secondDetailIndex]"></AfterDetail>
    </el-container>



</template>

<script>
import NavTop from "~/components/NavTop";
import NavLeft from "~/components/home/NavLeft";
import ApplyReturn from "~/components/home/ApplyReturn";
import AfterDetail from "~/components/home/AfterDetail";
import AfterRecord from "~/components/home/AfterRecord";
import AfterOrderDetail from "~/components/home/AfterOrderDetail";
export default {
     components: {
          NavTop,
          NavLeft,
          ApplyReturn,
          AfterRecord ,
          AfterDetail,
          AfterOrderDetail,
    },
    mounted(){

    },
    data(){
        return{
            showList:true,

            service:'first',
            orderList:[],
            secondDetailIndex : 0,



            afterServiceList :[
                {
                    afterServiceId : 123,
                    launchTime : '2018-6-28',
                    returnReason : '图书图片不符',
                    totalPrice : '20.5',
                    description : '买的时候网上看的图书封面是蓝色，买下来发现是红色',
                    buyerName : 'lwz',
                    phoneNumber : '13631433767',
                    purchaseTime : '2018-6-27',
                    orderId : '312',
                    itemTitle : '10001个为什么',
                    pictureAddress:'',

                    afterServiceState:'等待审核',
                    sellerMessage: '等待审核中',
                    addressDetail: '广东省广州市番禺区小谷围街道',
                    sellerName: '张三',
                    sellerPhoneNumber: '13622334455',
                    
                },
                {
                    afterServiceId : 163,
                    launchTime : '2018-6-28',
                    returnReason : '图书价格不符',
                    totalPrice : '20.5',
                    description : '买的时候说要10块，结果收我20块',
                    buyerName : 'lwz',
                    phoneNumber : '13631433767',
                    purchaseTime : '2018-6-27',
                    orderId : '356',
                    itemTitle : '10001个为什么',
                    pictureAddress:'',

                    afterServiceState:'等待退货',
                    sellerMessage: '同意就同意吧，没什么好说的。',
                    addressDetail: '广东省广州市番禺区小谷围街道',
                    sellerName: '张三',
                    sellerPhoneNumber: '13622334455',
                },
                    {
                    afterServiceId : 187,
                    launchTime : '2018-6-28',
                    returnReason : '图书价格不符',
                    totalPrice : '20.5',
                    description : '买的时候说要10块，结果收我20块',
                    buyerName : 'lwz',
                    phoneNumber : '13631433767',
                    purchaseTime : '2018-6-27',
                    orderId : '356',
                    itemTitle : '10001个为什么',
                    pictureAddress:'',

                    afterServiceState:'拒绝退货',
                    sellerMessage: '莫须有的事情，不同意。',
                    addressDetail: '广东省广州市番禺区小谷围街道',
                    sellerName: '张三',
                    sellerPhoneNumber: '13622334455',
                }
            ]
        }
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
        applyBtn(){
            this.showList = false;
        },
        applyBtn2(index){
            this.showList = false;
            this.secondDetailIndex = index;
        },
        goBack() {
            this.showList = true;
        },
        async getOrderList(){
            let data = {
                query : 'getSellOrder',
                data : {
                    userId : Cookies.get("userId"),
                    sessionId : Cookies.get("sessionId"),
                }
            }
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.orderList = response.data.orderList
            }
            else if (response.status == -1) {
                this.$message.error("登录超时！");
                Cookies.remove("userId");
                Cookies.remove("sessionId");
                Cookies.remove("userName");
                this.$router.push({ path: "/" });
            } else {
                this.$message.error("发生错误：" + response.err);
            }
        },
        async getAfterServiceList(){
            let data = {
                query : 'getAfterServiceList',
                data : {
                    userId : Cookies.get("userId"),
                    sessionId : Cookies.get("sessionId"),
                }
            }
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.afterServiceList = response.data.afterServiceList
            }
            else if (response.status == -1) {
                this.$message.error("登录超时！");
                Cookies.remove("userId");
                Cookies.remove("sessionId");
                Cookies.remove("userName");
                this.$router.push({ path: "/" });
            } else {
                this.$message.error("发生错误：" + response.err);
            }
        }
    }
}
</script>

<style>

.header {
  background-color: rgb(249, 249, 249);
  height: 40px;
}
.header-text {
  line-height: 30px;
  margin: 5px 0 5px 10px;
}
.order-book {
  width: 90px;
  height: 120px;
  margin: 10px;
}
.order-box {
  border-width: 2px 2px 2px 0;
  border-style: solid;
  border-color: rgb(249, 249, 249);
  height: 140px;
}
.order-box:first-child {
  border-left-width: 2px;
}
.order-title-text {
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.order-title-text-middle {
  margin-top: 40px;
}

.ApplyBtn{
    color: white;
    background-color: red;
    
    margin:50px 150px;
}
.back-button {
  color: #999;
  font-size: 30px;
  margin-top: 16px;
}

</style>
