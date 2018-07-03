<template>
    <!-- 买家角度： 查看所有可申请售后服务的商品的列表 -->
    <el-container v-if="showList">
        <el-main style="margin-top:20px;">
            <div>
                <el-tabs v-model="service" type="card" @tab-click="handleClick">
                    <el-tab-pane label="售后申请" name="first">
                       <AfterOrderDetail v-for="(order,index) in orderList"  :key="order.orderId" :index="index" :order="order" @applyReturn="applyBtn"></AfterOrderDetail>
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
        
            <ApplyReturn v-if="service=='first'" @applyReturnSuccess="applyReturnSuccess" :order="orderList[firstOrderIndex]" style="margin-top:50px;margin-left:-100px;"></ApplyReturn>
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
import Cookies from 'js-cookie'
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
        this.getOrderList()
        this.getAfterServiceList()
    },
    data(){
        return{
            showList:true,

            service:'first',
            orderList:[],
            secondDetailIndex : 0,
            firstOrderIndex : 0,


            afterServiceList :[]
        }
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
        applyBtn(index){
            this.showList = false;
            this.firstOrderIndex = index;
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
                query : 'getAfterOrder',
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
        },
        applyReturnSuccess(){
            this.getAfterServiceList()
            this.service = 'second';
            this.showList = true
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
