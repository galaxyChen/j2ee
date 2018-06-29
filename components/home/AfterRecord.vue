<template>
<div>
    <el-card v-if="visible" v-for="(item,index) in afterServiceList" :key="index" >
        <el-row class="header">
            <el-col class="header-text" :span="4">下单时间:{{item.purchaseTime}}</el-col>
            <el-col class="header-text" :span="4"> 订单编号:{{item.orderId}} </el-col>
        </el-row>
        <el-row class="el-row-body">
            <el-col :span="6" class="el-row-body-text">
                {{item.itemTitle}}
            </el-col>
            <el-col :span="6" class="el-row-body-text">
                <el-row style="margin-bottom:20px">服务单号:{{item.afterServiceId}}</el-row>
                <el-row>申请时间:{{item.launchTime}}</el-row>
            </el-col>
            <el-col :span="6" class="el-row-body-text">
                <el-button @click="seeDetail(index)">查看详情</el-button>
            </el-col>
        </el-row>
    </el-card>
    <AfterDetail v-if="!visible" :afterService="afterService" ></AfterDetail>
</div>
</template>

<style scope>
.el-card1{
    margin: 20px 5px
}
.header {
  background-color: rgb(249, 249, 249);
  height: 40px;
}
.header-text {
  line-height: 30px;
  margin: 5px 0 5px 10px;
}
.el-row-body {
    margin-top: 15px;
}
.el-row-body-text {
    margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>


<script>
import AfterDetail from "~/components/home/AfterDetail";
export default {
    mounted(){
    },
    components: {
        AfterDetail
    },
    props:["afterServiceList"],
    data(){
        return {
            visible : true,
            afterService: {
                afterServiceId : '',
                launchTime : '',
                returnReason : '',
                totalPrice : '',
                description : '',
                buyerName : '',
                phoneNumber : '',
                purchaseTime : '',
                orderId : '',
                itemTitle : ''
            },
        }
    },
    methods :{
        seeDetail(index){
            this.afterService = this.afterServiceList[index],
            this.visible = false
        },
        returnAfterRecord(){
            this.visible = true
        }
    }
}
</script>
