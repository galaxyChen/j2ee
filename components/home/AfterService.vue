<template>
    <el-container>
        <el-main style="margin-top:20px;">
            <div>
                <el-tabs v-model="service" type="card" @tab-click="handleClick">
                    <el-tab-pane label="售后申请" name="first">
                        <!-- 一个可以申请退货的商品 -->
                        <el-row>
                            <div class="header">
                                <el-col class="header-text" :span='6'>下单时间：{{order.purchaseTime}}</el-col>
                                <el-col class="header-text" :span='6'>订单编号:{{order.orderId}}</el-col>
                            </div>
                        </el-row>
                        <el-row>
                            <el-col class='order-box' :span='4'>
                                <div >
                                    <img class='order-book' :src='order.pictureAddress'/>
                                </div>
                            </el-col>
                            <el-col class='order-box' :span="12">
                                <h4 class="order-title-text">{{order.itemTitle}}</h4>
                                <a class="order-title-text">数量：{{order.quantity}}</a>
                            </el-col>
                            <el-col class="order-box" :span="8">
                                <el-button class="ApplyBtn" @click="applyBtn">申请退货</el-button>  
                            </el-col>
                        </el-row>

                </el-tab-pane>  

                <el-tab-pane label="申请记录" name="second">申请记录</el-tab-pane>
                </el-tabs>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import NavTop from "~/components/NavTop";
import NavLeft from "~/components/home/NavLeft";
export default {
     components: {
          NavTop,
          NavLeft 
    },
        data(){
            return{
                service:'first',
                order:{
                    pictureAddress:'',
                    purchaseTime: "2018/7/3 12:00",
                    orderId:12345,
                    itemTitle: "三体",
                    quantity : 4,
                }
            }
        },
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
            },
            applyBtn(){
                this.$router.push({path:'/ApplyReturn/'});
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

</style>
