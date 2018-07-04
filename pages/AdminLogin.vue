<template>
<div style="margin-top: 10%">
    <el-row type="flex" justify="center">
        <el-col :xs="18" :sm="18" :md="16" :lg="14" :xl="10" style="{padding: red}">
            <el-card>
            <el-form  ref="adminLoginForm" status-icon :model="adminLoginForm" :rules="loginRules"  label-width="80px">
                <el-form-item label="用户名" prop="adminName">
                    <el-input   v-model="adminLoginForm.adminName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input   type="password" v-model="adminLoginForm.password"></el-input>
                </el-form-item>
                <el-row type="flex" justify="end">
                    <el-form-item>
                    <el-button type="primary" @click="submitForm('adminLoginForm')">确定</el-button>
                    <el-button @click="resetForm('adminLoginForm')">重置</el-button>
                </el-form-item>
                </el-row>
            </el-form>
            </el-card>
        </el-col>
    </el-row>
</div>
</template>
<script>
import Cookies from "js-cookie";

export default {
    data(){
        return {
            adminLoginForm:{
                adminName: "",
                password: ""
            },
            query: "adminLogin",
            loginRules: {
                adminName: [
                { required: true, message: "请输入客服账号", trigger: "blur", trigger: "change"},
                ],
                password: [
                { required: true, message: "请输入正确的密码", trigger: "blur", trigger: "change" },
                ]
            },  
        }
    },
    methods: {
        // 提交表单
        submitForm: function(formName){
            // 序列化表单信息
            function serialize(obj) {
                let result = {};
                for (let term in obj){
                    if (obj.hasOwnProperty(term)){
                        result[term] = obj[term];
                    }
                }   
                return result;
            }

            // 验证表单信息并发送
            this.$refs[formName].validate(async valid => {
               if (valid) {
                    let data = {
                       query: this.query
                    };
                    data.data = serialize(this.serviceLoginForm);
                    // let response = await this.$axios.send(data);
                    let response = {
                        status: 1,
                        data: {
                            adminId: 1,
                            adminName: "root",
                            sessionId: "11111",
                        }

                    }
                    this.applyLogin(response);
               }
            });
        },

        applyLogin(response) {
            if (response.status === 1) {
                console.log("login success");
                Cookies.set("adminId", response.data.adminId);
                Cookies.set("adminName", response.data.adminName);
                Cookies.set("sessionId", response.data.sessionId);
                this.$router.push({ path: "/AdminCenter/" });
            } else {
                console.log("error");
                this.$message.error("用户名或密码错误" );
            }
        },

        // 重置登录信息
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }

}
</script>

