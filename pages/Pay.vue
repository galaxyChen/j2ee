<template>
    <el-container>
        <el-header>
            <NavTop></NavTop>
        </el-header>

        <el-main class="main-box">
            <p style="color:#CCCCCC;margin-left:80px;">支付订单</p>
            <div class="payTips">
                <el-row > 
                    <el-col :span="18">
                         <i class="el-icon-success" style="color:green;font-size:50px;float:left;"></i>
                         <el-row style="margin-left:60px;font-size:20px;">
                        订单提交成功！请尽快完成支付！</el-row>
                        <el-row style="margin-left:60px;color:#CCCCCCC">请在 {{time_limit}} 内完成支付，超时后将取消订单</el-row>
                    </el-col>

                    <el-col :span="6">
                        <el-row style="margin-left:60px;">应付总额: ￥ {{price}}</el-row>
                    </el-col>
                </el-row>
                <el-button type="primary" class="confirmBtn">支付</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import NavTop from "~/components/NavTop";
export default {
     components: {
          NavTop,
    },
    data(){
        return{
            time_limit:'2小时0分',
            price:1245.00,
        }
    }
}
</script>

<style>
body{
    background-color:rgb(237, 242, 248);
}
.main-box{ 
    margin-top:15px;
}
.payTips{
    background-color: white;
    margin:30px 4%;
    padding: 20px 7%;
}
.confirmBtn{
    margin-left:90%;
}
</style>
