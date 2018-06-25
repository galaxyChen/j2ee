
<template>
      <!-- 1.“即使未填写完选项认可跳转到下一页”  2.该有将输入的密保答案与后台返回的答案作对比，且答案不对。要有处理 -->
    <el-container >
        <el-header>
            <NavTop></NavTop>
            <el-row>
                <div style="margin:10px 0px;font-size:30px;font-weight: 600;color:green;" >
                    找 回 账 号 密 码
                </div>  
            </el-row>
      </el-header>
      <el-main class="FindPw-box">
            <el-row style="margin-bottom:40px">  
                <el-steps align-center class="step-line" :space="600" :active="step"  finish-status="success" >
                    <el-step title="填写用户名（注册邮箱）"></el-step>
                    <el-step title="身份验证"></el-step>
                    <el-step title="设置新密码"></el-step>
                    <el-step title="修改成功"></el-step>
                </el-steps>

                <!-- 步骤1：输入用户名或注册邮箱 -->
                <template v-if="this.step=='0'">
                    <el-form :model="FindPwForm" :rules="rules" ref="FindPwForm" label-width="100px" style="margin-top:30px;">
                        <!-- 
                        :rules="[
                            { required: true, message: '请输入用户名（即邮箱地址）', trigger: 'blur' },
                            { type: 'email', message: '请输入正确的用户名（即邮箱地址）', trigger: ['blur', 'change'] }
                            ]"> -->
                        <el-form-item  label="用户名（即注册邮箱）" prop="account" >
                            <el-input v-model="FindPwForm.account" placeholder="邮箱"></el-input>
                        </el-form-item> 
                        <el-form-item>
                                <el-button type="primary" @click="goNext1" style="margin-left:85%" >下一步</el-button>
                        </el-form-item>                            
                    </el-form>
                </template>

                <!--步骤2： 验证密保问题 -->
                <template v-else-if="step=='1'">
                    <el-row>
                        <el-form :model="FindPwForm" :rules="rules" ref="FindPwForm" label-width="100px" class="input-box">
                            <a class='person-question' style="margin-left:100px;margin-top:50px;">密保问题：{{FindPwForm.question}}</a>   
                            <el-form-item prop="answer" >
                                <el-input v-model='FindPwForm.answer' placeholder="密保答案" size='medium' style="margin-top:20px"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-top:50px;">
                                    <el-button @click="goForward" style="margin-left:69%;">上一步</el-button>
                                    <el-button type="primary" @click="goNext2">下一步</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>
                </template>

                <!--步骤3 输入新密码并确认 -->
                <template v-else-if="step=='2'" >
                    <el-form :model="FindPwForm" status-icon :rules="rules" ref="FindPwForm" label-width="100px" >
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="FindPwForm.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="FindPwForm.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        
                        <el-form-item style="margin-left:59%">
                                <el-button type="primary" @click="ModifyPw">确认修改</el-button>  
                            <!-- <el-button type="primary" @click="submitForm('FindPwForm')">确认密码</el-button>  早上 -->
                            <el-button @click="resetForm('FindPwForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </template>    

                <!-- 步骤4 提示修改成功 -->
                <template v-else-if="step=='3'">
                    <div>
                        <i class="el-icon-success" style="color:green;margin:50px 100px 20px 20%;font-weight:600;font-size:28px;line-height:150%"> 
                            密码重置成功!下次请使用新密码进行登录！</i>
                        <div style="margin-top:50px;margin-left:45%">
                            <el-button type="primary" @click="returnIndex">返回首页</el-button>
                        </div>
                    </div>
                </template>         
            </el-row>
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
        // var validateAccount = (rule,value,callback) => {
        //     if (value===''){
        //         callback(new Error('请输入用户名（即邮箱地址）！'));
        //     }else{

        //     }
        // };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                 callback(new Error('请输入密码'));
            } else {
            if (this.FindPwForm.checkPass !== '') {
                this.$refs.FindPwForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.FindPwForm.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
                // const confirmBtn = document.querySelector(".button");
                // confirmBtn.className = "button el-button";
                // const button = document.querySelector(".button button");
                // button.disabled = false;
                 callback();
            }
        };

        return{
            step:0,
            FindPwForm:{
                account:'',
                question:'你的生日是？',
                answer:'',
                pass: '',
                checkPass: '',
            },

            rules: {
                account:[
                     { required: true, message: '请输入用户名（即邮箱地址）', trigger: 'blur' },
                     { type: 'email', message: '请输入正确的用户名（即邮箱地址）', trigger: ['blur', 'change'] }
                ],
                answer:[
                    { required: true, message: '请输入答案！', trigger: 'blur' },               
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
             ],
           }
        }
    },

    methods:{
        goNext1(){
            var value1 = this.FindPwForm.account;
            if(value1=='')
            {
                console.log("没有任何输入");
                this.$message("请输入账号！")
            }
            else{
                var reg =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                var isok = reg.test(value1);
                if(isok)
                {
                    console.log("点击了下一步");
                     this.step++;   
                }
               else{
                   this.$message("邮箱格式不正确！");
               }
            }
        },
          goNext2(){
            if(this.FindPwForm.answer=='')
            {
                console.log("没有任何输入");
                this.$message("请输入密保答案！")
            }
            else{
                console.log("点击了下一步");
                 this.step++;  
            }
        },

        goForward(){
            console.log("点击了上一步");
            this.step--;
        },
        ModifyPw(){
            if(this.FindPwForm.pass && this.FindPwForm.checkPass)
            {   
                if(this.FindPwForm.pass==this.FindPwForm.checkPass){
                    console.log("修改成功！");
                     this.step++;
                }
                else{
                     this.$message("修改失败！请确认两次密码输入一致！");
                }
            }
            else{
                this.$message("修改失败！请确认信息正确填写！");
            }
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // submitForm(formName) {
        //     this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //         alert('submit!');
        //     } else {
        //         console.log('error submit!!');
        //         return false;
        //     }
        //     });
        //     this.step++;
        // },
        returnIndex(){
            this.$router.push({ path: `/` });
        },
    },
}
</script>

<style>
.FindPw-box{
    margin:5%;
    padding:20px 200px 100px 200px;
    border-style: dashed;
    border-color:lightsteelblue;
}
.person-question {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 20px;

}
</style>

