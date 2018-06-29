<template>
    <div>
        <el-row>
            <el-col :span="4">服务单号：{{afterService.afterServiceId}}</el-col>
            <el-col :span="4">申请时间：{{afterService.launchTime}}</el-col>
        </el-row>
        <el-row>
            服务单信息：
        </el-row>
        <el-row>
            <el-card>
                <p>退货原因：{{afterService.returnReason}}</p>
                <p>退款金额：￥{{afterService.totalPrice}}</p>
                <p>联系人：{{afterService.buyerName}}</p>
                <p>联系电话：{{afterService.phoneNumber}}</p>
                <p>售后服务状态：</p>
            </el-card>
        </el-row>
        <el-row>
           <p>问题描述：{{afterService.description}}</p>
        </el-row>

    </div>
</template>

<style scope>

</style>


<script>
export default {
    props:["afterService"]
}
</script>
