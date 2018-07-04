<template>
    <div>
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
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    props :["order","index"],
    methods : {
        
        applyBtn(){
            this.$emit("applyReturn",this.index)
        }
    }
}
</script>
