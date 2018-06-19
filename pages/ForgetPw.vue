<template>
        <el-container class="FindPw-box">
            <!-- <el-button type="text" disabled>找回账号密码</el-button> -->
            找回账号密码
            <el-row class="step">
                <el-steps align-center class="step-line" :space="200" :active="0" finish-status="success">
                    <el-step title="填写用户名（注册邮箱）"></el-step>
                    <el-step title="身份验证"></el-step>
                    <el-step title="设置新密码"></el-step>
                    <el-step title="修改成功"></el-step>
                </el-steps>
                <div class="demo-input-suffix">
               
                    <el-input placeholder="用户名/邮箱" v-model="Username"  label="用户名（注册邮箱）">
                    </el-input>
                </div>       
                <el-button style="margin-top: 12px;" @click="next" >下一步</el-button>
            </el-row>
            
        </el-container>
</template>

<style>

.step{
    margin:5%;
    padding:80px 200px 100px 200px;

    border-style: dashed;
    border-color: bisque;

    text-align: center;
}

</style>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

