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
                    <el-steps align-center class="step-line" :space="600" :active="step"  finish-status="success" >
                        <el-step title="填写用户名（注册邮箱）"></el-step>
                        <el-step title="身份验证"></el-step>
                        <el-step title="设置新密码"></el-step>
                        <el-step title="修改成功"></el-step>
                    </el-steps>

                    <!-- 输入用户名或注册邮箱 -->
                    <template v-if="this.step=='0'">
                        <el-form :model="FindPwForm" ref="FindPwForm" label-width="100px" class="input-box">
                            <el-form-item  prop="email" label="用户名（即注册邮箱）"
                                :rules="[
                                { required: true, message: '请输入用户名（即邮箱地址）', trigger: 'blur' },
                                { type: 'email', message: '请输入正确的用户名（即邮箱地址）', trigger: ['blur', 'change'] }
                                ]">
                                <el-input v-model="FindPwForm.account"></el-input>
                            </el-form-item>                             
                        </el-form>
                    </template>

                    <!-- 验证密保问题 -->
                    <template v-else-if="step=='1'">
                        <el-row  >
                            <el-form :model="FindPwForm" ref="FindPwForm" label-width="100px" class="input-box">
                                <a class='person-question'>密保问题：{{FindPwForm.question}}</a>
                                <el-input v-model='FindPwForm.answer' placeholder="密保答案" size='medium'></el-input>
                            </el-form>
                        </el-row>
                    </template>

                    <!-- 输入新密码并确认 -->
                    <template v-else-if="step=='2'">

                    </template>
                    
                    <el-button type="primary" @click="next" style="margin-left:85%">下一步</el-button>
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
  margin-bottom: 20px;
  font-size: 20px;
}

</style>

<script>

export default {

    data(){ 
        return{
            step:0,
            FindPwForm:{
                account:'',
                question:'你的生日是？',
                answer:'',
            }
        }
    },

    method:{
       next() {
             console.log("test click");
             this.step++;
             
      }
    }

}
</script>

