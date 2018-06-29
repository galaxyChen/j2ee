<template>
    <div style="margin:20px;">
        <el-row class="row1">
            <el-col :span="4">服务单号：{{afterService.afterServiceId}}</el-col>
            <el-col :span="4">申请时间：{{afterService.launchTime}}</el-col>
        </el-row>
        <el-row class="row1">
            服务单信息：
        </el-row>
        <el-row class="row1">
            <div >
                <el-row>
                    <el-col :span="4" class="col-title">退货原因</el-col>
                    <el-col :span="5" class="col-text">{{afterService.returnReason}}</el-col>      
                </el-row>
                <el-row>
                    <el-col :span="4" class="col-title">退款金额</el-col>
                     <el-col :span="5" class="col-text">￥{{afterService.totalPrice}}</el-col>     
                </el-row>
                <el-row>
                    <el-col :span="4" class="col-title">联系人</el-col> 
                    <el-col :span="5" class="col-text">{{afterService.buyerName}}</el-col>     
                </el-row>
                <el-row>
                    <el-col :span="4" class="col-title">联系电话</el-col>
                     <el-col :span="5" class="col-text">{{afterService.phoneNumber}}</el-col>     
                </el-row>
                <el-row>
                    <el-col :span="4" class="col-title">售后服务状态</el-col>  
                     <el-col :span="5" class="col-text">test</el-col>   
                </el-row>
            </div>
        </el-row>
        <el-row class="row1">
           <p>问题描述：{{afterService.description}}</p>
        </el-row>

    </div>
</template>

<style scope>
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
.row1 {
    margin-bottom: 30px;
    margin-top: 20px;
}
</style>


<script>
export default {
    props:["afterService"]
}
</script>
