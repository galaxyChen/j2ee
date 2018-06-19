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
                    <!-- <el-row :gutter="24">
                        <el-col  :span="8">
                            <div>
                            用户名（注册邮箱）:
                            </div>
                        </el-col>
                        <el-col :span="16">
                            <div> <el-input placeholder="用户名/邮箱" v-model="Username"  ></el-input></div>
                        </el-col>
                        <el-button style="margin-top: 12px;margin-left:75%" @click="next" >下一步</el-button>     
                    </el-row>      -->

                    <!-- 未修改model -->
                <el-row>
                   <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">确认密码</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
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

</style>

<script>
export default {
    data(){ 
         var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return{
            ruleForm:{
                pass: '',
                checkPass: '',
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
             ],
           }
            
        }
    }
}
</script>

