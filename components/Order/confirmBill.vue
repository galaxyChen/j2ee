<template>
<div>
    <el-row type="flex" justify="end">
        <el-col :span="5" class="leftDiv">
            <el-row class="el-row1">
                商品件数：
            </el-row>
            <el-row class="el-row1">
                商品总价：
            </el-row>
            <el-row class="el-row1">
                运费：
            </el-row>
            <el-row class="el-row1">
                应付总额：
            </el-row>
        </el-col>

        <el-col :span="5" :model="totalList" class="rightDiv">
            <el-row class="el-row1">
                {{totalList.nums}}件
            </el-row>

            <el-row class="el-row1">
                ￥{{totalList.pay}}
            </el-row>

            <el-row class="el-row1">
                ￥{{totalList.postage}}
            </el-row>

            <el-row class="el-row1">
                ￥{{totalList.postage+totalList.pay }}
            </el-row>
        </el-col>
    </el-row>
    <el-row type="flex" justify="end" class="el-row1">
        <el-button @click="cancelBill">取消订单</el-button>
        <el-button type="primary" @click="submitBill">提交订单</el-button>
    </el-row>
</div>
</template>

<style scope>
.rightDiv{
  color :red;
  text-align: right
}
.leftDiv{
    text-align: right
}
</style>

<script>
export default {
    props:["totalList"],
    methods:{
        cancelBill(){
            this.$router.go(-1);
        },

        submitBill(){
            this.$emit('submitBill')
        }
    }
}
</script>
