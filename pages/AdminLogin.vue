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
                <el-form-item label="验证码">
                    <el-input v-model="checkcode" placeholder="区分大小写"></el-input>
                    <div @click="changeCode" style="background-color:#999;font-size:24px;text-align:center;margin-top:10px;color:red;width:80px;height:40px;">{{codeStr}}</div>
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
  mounted() {
    this.codeStr = this.getCode();
  },
  data() {
    return {
      adminLoginForm: {
        adminName: "",
        password: ""
      },
      checkcode: "",
      codeStr: "",
      query: "adminLogin",
      loginRules: {
        adminName: [
          {
            required: true,
            message: "请输入客服账号",
            trigger: "blur",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入正确的密码",
            trigger: "blur",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    getCode() {
      let code = new Array(
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      );
      let codeLength = 4;
      let codeStr = "";
      for (let i = 0; i < codeLength; i++) {
        let num = Math.floor(Math.random() * 62);
        codeStr += code[num];
      }
      return codeStr;
    },
    changeCode() {
      this.codeStr = this.getCode();
    },
    // 提交表单
    submitForm: function(formName) {
      // 序列化表单信息
      function serialize(obj) {
        let result = {};
        for (let term in obj) {
          if (obj.hasOwnProperty(term)) {
            result[term] = obj[term];
          }
        }
        return result;
      }

      // 验证表单信息并发送
      this.$refs[formName].validate(async valid => {
        if (this.codeStr != this.checkcode) {
          this.$message.error("验证码填写错误！");
          this.codeStr = this.getCode();
          return;
        }
        let data = {};
        if (valid) {
          data = {
            query: "adminLogin",
            data: {
              adminName: this.adminLoginForm.adminName,
              password: this.adminLoginForm.password
            }
          };
          // data.data = serialize(this.adminLoginForm);
          let response = await this.$axios.send(data);
          this.applyLogin(response);
        }
      });
    },

    applyLogin(response) {
      if (response.status === 1) {
        console.log("login success");
        Cookies.set("adminId", response.data.adminId);
        Cookies.set("adminName", this.adminLoginForm.adminName);
        Cookies.set("sessionId", response.data.sessionId);
        this.$router.push({ path: "/AdminCenter/" });
      } else {
        this.codeStr = this.getCode();
        console.log("error");
        this.$message.error("用户名或密码错误");
      }
    },

    // 重置登录信息
    resetForm(formName) {
      this.checkcode = "";
      this.codeStr = this.getCode();
      this.$refs[formName].resetFields();
    }
  }
};
</script>

