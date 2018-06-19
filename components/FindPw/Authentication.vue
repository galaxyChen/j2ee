<template>
        <el-container class="FindPw-box">
            <!-- <el-button type="text" disabled>找回账号密码</el-button> -->
            <el-main>
                <el-row>
                    <div style="text-align:center;margin-bottom:40px;font-size:30px;font-weight: 600;">
                        找 回 账 号 密 码
                    </div>  
                </el-row>
                 <el-row style="margin-bottom:40px">  
                    <el-steps align-center class="step-line" :space="600" :active="0"  finish-status="success" >
                        <el-step title="填写用户名（注册邮箱）"></el-step>
                        <el-step title="身份验证"></el-step>
                        <el-step title="设置新密码"></el-step>
                        <el-step title="修改成功"></el-step>
                    </el-steps>
                </el-row>
                
                <el-row>
                    <el-form :model="FindPwForm" ref="FindPwForm" label-width="100px" class="input-box">
                        <a class='person-question'>密保问题：{{question}}</a>
                        <el-input v-model='answer' placeholder="密保答案" size='medium'></el-input>
                        <el-form-item>
                            <el-button type="primary" @click="next" style="margin-left:85%">下一步</el-button>
                        </el-form-item>
                    </el-form>
                 </el-row>
            </el-main>
        </el-container>
</template>

<style>

.FindPw-box{
    margin:5%;
    padding:20px 200px 100px 200px;

    border-style: dashed;
    border-color:lightsteelblue;
}

.person-question {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>

<script>
export default {
    data(){ 
        return{
           question:"你的生日是？"
        }
    }
}
</script>

