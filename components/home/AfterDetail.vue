<template>
    <!--买家角度： 查看单笔订单的退货详情 -->
    <div style="border-style: solid;border-color: rgb(238, 238, 238);">    
        <el-row class="row1 status" >
            <el-col :span="6" style="color:red">售后服务状态：{{afterService.afterServiceState}}</el-col>
            <el-col :span="6" :offset="2">服务单号：{{afterService.afterServiceId}}</el-col>
            <el-col :span="10"  >申请时间：{{afterService.launchTime}}</el-col>
        </el-row>
        <div class="serviceMsg">
            <el-row class="row1">
                <h3 style="color:#cccccc;">服务单信息：</h3>
            </el-row>
            <div class="row1">
                <el-row class="msg"> 
                    <el-col :span="4" class="col-title">服务单号</el-col>
                    <el-col :span="20" class="col-text">{{afterService.afterServiceId}}</el-col>      
                </el-row>
                <el-row class="msg"> 
                    <el-col :span="4" class="col-title">申请时间</el-col>
                    <el-col :span="20" class="col-text">{{afterService.launchTime}}</el-col>      
                </el-row>
                <el-row class="msg"> 
                    <el-col :span="4" class="col-title">退货原因</el-col>
                    <el-col :span="20" class="col-text">{{afterService.returnReason}}</el-col>      
                </el-row>
                <el-row class="msg">
                    <el-col :span="4" class="col-title">退款金额</el-col>
                    <el-col :span="20" class="col-text">￥{{afterService.totalPrice}}</el-col>     
                </el-row>
                <el-row class="msg">
                    <el-col :span="4" class="col-title">联系人</el-col> 
                    <el-col :span="20" class="col-text">{{afterService.buyerName}}</el-col>     
                </el-row>
                <el-row class="msg">
                    <el-col :span="4" class="col-title">联系电话</el-col>
                    <el-col :span="20" class="col-text">{{afterService.buyerPhoneNumber}}</el-col>     
                </el-row>
            </div>
        </div>
        <el-row class="row1">
            <h3 style="color:#cccccc;">问题描述</h3>
            <p style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;margin-bottom:40px;padding:20px;">{{afterService.description}}</p>
            <!-- 加入照片凭证 -->
            <div>
                <img :src="afterService.pictureAddress">
            </div>
        </el-row>

        <div class="check" v-if="ifShow(afterService.afterServiceState)">
            <!-- 状态为 已审核 才显示这个框 -->
            <h3 style="color:#cccccc;">审核留言</h3>
            <div style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;padding:20px;line-height:25px;">
                <p style="margin-bottom:30px;">{{afterService.sellerMessage}}</p>
                <div v-if="afterService.afterServiceState!='审核不通过'">
                    <li>收货地址： {{afterService.addressDetail}}</li>
                    <li>联系姓名： {{afterService.sellerName}}</li>
                    <li>联系电话： {{afterService.sellerPhoneNumber}}</li>
                </div>

            </div>
        </div>

        <!-- 未想好 点击取消之后，页面如何变化 -->
        <!-- <el-button  type="primary" class="cancelBtn" @click="confirmCancel">取消</el-button> -->
    </div>
</template>

<style scope>
.cancelBtn{
    float:right;
    margin-top:30px;
}
.container{
    margin-top: 0px;
}
.col-title{
    text-align: center;
    background-color: rgb(249, 249, 249);
    border-style: solid;
    border-width: 1px;
    border-color: rgb(228, 228, 228);
    font-size: 18px;
}
.col-text{
    text-align: left;
    left : 80px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(228, 228, 228);
    padding-left: 20px;
}

.msg{
    margin-bottom: 3px;
    padding:1px;
}
.row1 {
    margin-bottom: 30px;
    /* margin-top: 30px;  */
}
.status{
    background-color: #eeebeb;
    width:100%;
    padding:20px;
    
}
</style>


<script>
export default {
    props:["afterService"],
    methods:{
        ifShow(state){
            if(state=='等待退货' || state=='等待售后收货' ||state=='售后已签收'||state=='完成售后'||state=='卖家申诉中')
                return true
            return false
        }
    }
}
</script>
