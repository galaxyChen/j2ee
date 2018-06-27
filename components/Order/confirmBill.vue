<template>
    <div :model="totalList">
        <el-row class="el-row1">商品件数：
            <span style="color:red">
                {{totalList.nums}}件
            </span>
        </el-row>

        <el-row class="el-row1">商品总额：
            <span style="color:red">
                ￥{{totalList.pay}}
            </span>
        </el-row>

        <el-row class="el-row1">运费：
            <span style="color:red">
                ￥{{totalList.postage}}
            </span>
        </el-row>

        <el-row class="el-row1">应付总费：
            <span style="color:red">
                ￥{{totalList.postage+totalList.pay }}
            </span>
        </el-row>
        <el-row class="el-row1">
            <el-button type="primary" @click="submitBill">提交订单</el-button>
        </el-row>
        
    </div>
</template>

<style scope>
.el-row1{
  margin-top: 20px
}

</style>

<script>
export default {
    props:["totalList"],
    methods:{


        submitBill(){
            this.$emit('submitBill')
        }
    }
}
</script>
