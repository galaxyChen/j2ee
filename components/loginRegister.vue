<template>

    <el-dialog title="用户登录注册" :visible.sync="visible" @closed='closeDialog' width="30%" > 

        <el-tabs v-model="query" type="card" >
            <el-tab-pane label="登录" name="login"></el-tab-pane>
            <el-tab-pane label="注册" name="register"></el-tab-pane>

            <el-form  ref="loginForm" status-icon :model="loginForm" :rules="loginRules"  label-width="80px" v-show="query=='login'">
                <el-form-item label="登录邮箱" prop="email">
                    <el-input   v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input   type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
              
                <el-form-item label="验证码">
                    <el-input v-model="checkcode" placeholder="区分大小写"></el-input>
                    <div @click="changeCode" style="background-color:#999;font-size:24px;text-align:center;margin-top:10px;color:red;width:60px;height:40px;">{{codeStr}}</div>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">确定</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="text" @click="ForgetPw" style="margin-left:70%">忘记密码</el-button>
                </el-form-item>

            </el-form>

            <el-form  ref="regForm" status-icon :model="regForm"  :rules="regRules"  label-width="80px" v-show="query=='register'">
                <el-form-item label="注册邮箱" prop="email">
                    <el-input   v-model="regForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input  type="password" v-model="regForm.password"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="password2"> 
                    <el-input  type="password" v-model="regForm.password2"></el-input>
                </el-form-item>
                
                <el-form-item label="昵称" prop="userName">
                    <el-input v-model="regForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密保问题" prop="securityQuestion">
                    <el-input  type="textarea" maxlength=100 v-model="regForm.securityQuestion" placeholder="不超过100个字符"></el-input>
                </el-form-item>

                <el-form-item label="密保回答" prop="securityAnswer">
                    <el-input  type="textarea" maxlength=50 v-model="regForm.securityAnswer" placeholder="不超过50个字符"></el-input>
                </el-form-item>

                <el-form-item label="密保回答" prop="securityAnswer">
                    
                    <el-input  type="textarea" maxlength=50 v-model="regForm.securityAnswer" placeholder="不超过50个字符"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('regForm')">确定</el-button>
                    <el-button @click="resetForm('regForm')">重置</el-button>
                </el-form-item>
            </el-form>
            
        </el-tabs>

    </el-dialog>
</template>


<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>


<script>
import Cookies from "js-cookie";

export default {
  mounted() {
    this.$on("openDialog", function() {
      this.visible = true;
    });
    this.$on("closeDialog", function() {
      this.visible = false;
    });
    this.codeStr = this.getCode();
  },
  data() {
    var validatePw = (rule, value, callback) => {
      let p = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[_])[\da-zA-Z_]+$/;
      let p1 = /^[\da-zA-Z_]+$/;
      if (value == "") {
        callback(new Error("请输入密码"));
      } else if (!p1.test(value)) {
        callback(new Error("只能包含数字、字母和下划线"));
      } else if (value.length > 16 || value.length < 6) {
        callback(new Error("长度在 6 到 16 个字符"));
      } else if (!p.test(value)) {
        callback(new Error("最少包含数字、字母和下划线"));
      } else {
        if (this.regForm.password2 !== "") {
          this.$refs.regForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePw2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else if (value.length > 16 || value.length < 6) {
        callback(new Error("长度在 6 到 16 个字符"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      loginForm: {
        email: "",
        password: ""
      },
      checkcode: "",
      codeStr: "",
      regForm: {
        userName: "",
        email: "",
        password: "",
        password2: "",
        securityQuestion: "",
        securityAnswer: ""
      },
      query: "login",
      loginRules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱",
            trigger: "blur",
            trigger: "change"
          },
          { min: 1, max: 30, message: "长度小于30个字符", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入正确的密码",
            trigger: "blur",
            trigger: "change"
          }
        ]
      },
      regRules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱",
            trigger: "blur",
            trigger: "change"
          },
          {
            min: 1,
            max: 30,
            message: "长度小于30个字符",
            trigger: "blur",
            trigger: "change"
          }
        ],
        userName: [
          {
            validator: (rule, value, callback) => {
              if (value == "") {
                callback(new Error("请输入昵称"));
              } else if (value.length > 20) {
                callback(new Error("长度不超过20个字"));
              } else {
                let p1 = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
                let p2 = /^[0-9]+$/;
                if (p2.test(value)) {
                  callback(new Error("由汉字、字母和数字组成，不允许是纯数字"));
                } else if (!p1.test(value)) {
                  callback(new Error("由汉字、字母和数字组成，不允许是纯数字"));
                }
                callback();
              }
            },
            trigger: "blur",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            validator: validatePw,
            trigger: "blur",
            trigger: "change"
          }
        ],
        password2: [
          {
            required: true,
            validator: validatePw2,
            trigger: "blur",
            trigger: "change"
          }
        ],
        securityQuestion: [
          {
            required: true,
            message: "请输入密保问题",
            trigger: "blur",
            trigger: "change"
          },
          {
            min: 1,
            max: 100,
            message: "长度小于100个字",
            trigger: "blur",
            trigger: "change"
          }
        ],
        securityAnswer: [
          {
            required: true,
            message: "请输入密保回答",
            trigger: "blur",
            trigger: "change"
          },
          {
            min: 1,
            max: 50,
            message: "长度小于50个字",
            trigger: "blur",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm: function(formName) {
      console.log("login" + formName);
      function serialize(obj) {
        let result = {};
        for (let term in obj) {
          if (term == "password2") continue;
          if (obj.hasOwnProperty(term)) {
            result[term] = obj[term];
          }
        }
        return result;
      }

      this.$refs[formName].validate(async valid => {
        if (valid) {
          let data = {
            query: this.query
          };
          if (this.codeStr!=this.checkcode){
            this.$message.error("验证码填写错误！")
            return ;
          }
          if (data.query == "login") data.data = serialize(this.loginForm);
          else if (data.query == "register")
            data.data = serialize(this.regForm);
          let response = await this.$axios.send(data);
          console.log(response);
          if (data.query == "login") this.applyLogin(response);
          else if (data.query == "register") {
            if (this.applyRegister(response)) {
              let newData = {
                query: "login",
                data: {
                  email: data.data.email,
                  password: data.data.password
                }
              };
              let response = await this.$axios.send(newData);
              this.applyLogin(response);
            }
          }
        } else {
          console.log("error");
        }
      });
    },
    applyLogin(response) {
      if (response.status === 1) {
        console.log("login success");
        Cookies.set("userId", response.data.userId);
        Cookies.set("userName", response.data.userName);
        Cookies.set("sessionId", response.data.sessionId);
        this.$emit("logined");

        this.visible = false;
      } else {
        console.log("error");
        // this.$message.error("发生错误：" + response.err);
        this.$message.error("用户名或密码错误");
      }
    },
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
    applyRegister(response) {
      if (response.status === 1) {
        console.log("register success");
        return true;
      } else {
        console.log("error");
        this.$message.error("发生错误：" + response.err);
        return false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.checkcode = "";
      this.codeStr = this.getCode()
    },
    closeDialog() {
      this.$refs["regForm"].resetFields();
      this.$refs["loginForm"].resetFields();
    },
    ForgetPw() {
      this.$router.push({ path: `/ForgetPw/` });
    }
  }
};
</script>