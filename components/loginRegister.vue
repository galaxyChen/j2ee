<template>

    <el-dialog title="用户登录注册" :visible.sync="visible" @closed='closeDialog' width="30%" > 

        <el-tabs v-model="query" type="card" >
            <el-tab-pane label="登录" name="login"></el-tab-pane>
            <el-tab-pane label="注册" name="register"></el-tab-pane>

            <el-form  ref="loginForm" status-icon :model="loginForm" :rules="loginRules"  label-width="80px" v-show="query=='login'">
                <el-form-item label="登录邮箱" prop="email">
                    <el-input  @input='check("loginForm","email")' v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input  @input='check("loginForm","password")' type="password" v-model="loginForm.password"></el-input>
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
                    <el-input  @input='check("regForm","email")'  v-model="regForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input  @input='check("regForm","password")' type="password" v-model="regForm.password"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="password2"> 
                    <el-input @input='check("regForm","password2")' type="password" v-model="regForm.password2"></el-input>
                </el-form-item>
                
                <el-form-item label="昵称" prop="userName">
                    <el-input @input='check("regForm","userName")' v-model="regForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密保问题" prop="securityQuestion">
                    <el-input @input='check("regForm","securityQuestion")' type="textarea" maxlength=100 v-model="regForm.securityQuestion" placeholder="不超过100个字符"></el-input>
                </el-form-item>

                <el-form-item label="密保回答" prop="securityAnswer">
                    <el-input @input='check("regForm","securityAnswer")' type="textarea" maxlength=50 v-model="regForm.securityAnswer" placeholder="不超过50个字符"></el-input>
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
  },
  data() {
    var validatePw = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      } 
      else if (value.length > 16 || value.length < 6) {
        callback(new Error("长度在 6 到 16 个字符"));
      } 
      else {
        let p = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[_])[\da-zA-Z_]+/;
        
        if(!p.test(value)){
          callback(new Error("最少包含数字、字母和下划线"))
        }
        else if (this.regForm.password2 !== "") {
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
          { type: "email", required: true, message: "请输入正确的邮箱", trigger: "blur" },
          { min: 1, max: 30, message: "长度小于30个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入正确的密码", trigger: "blur" },
        ]
      },
      regRules: {
        email: [
          { type: "email", required: true, message: "请输入正确的邮箱", trigger: "blur" },
          { min: 1, max: 30, message: "长度小于30个字符", trigger: "blur" }
        ],
        userName: [
          {  
            validator:(rule,value,callback)=>{
              if(value==''){
                callback(new Error("请输入昵称"))
              }
              else if(value.length>20){
                callback(new Error("长度不超过20个字"))
              }
              else{
                let p = /^[0-9]*$/;
                if(p.test(value)){
                  callback(new Error("由汉字、字母和数字组成，不允许是纯数字"))
                }
                callback()
              }
            }, 
            trigger: "blur" 
          },
        ],
        password: [{ required: true, validator: validatePw, trigger: "blur" }],
        password2: [{ required: true, validator: validatePw2, trigger: "blur" }],
        securityQuestion: [
          { required: true, message: "请输入密保问题", trigger: "blur" },
          { min: 1, max: 100, message: "长度小于100个字", trigger: "blur" }
        ],
        securityAnswer: [
          { required: true, message: "请输入密保回答", trigger: "blur" },
          { min: 1, max: 50, message: "长度小于50个字", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    check(formName, item) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validateField(item);
    },
    submitForm: function(formName) {
      console.log("login" + formName);
      function serialize(obj) {
        let result = {};
        for (let term in obj) {
          if (term=='password2')
            continue;
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
          
          if (data.query == "login") data.data = serialize(this.loginForm);
          else if (data.query == "register")
            data.data = serialize(this.regForm);
          let response = await this.$axios.send(data);
          console.log(response)
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
        this.$message.error("用户名或密码错误" );
      }
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
    },
    closeDialog() {
      this.$refs["regForm"].resetFields();
      this.$refs["loginForm"].resetFields();
    },
    ForgetPw(){
       this.$router.push({ path: `/ForgetPw/` });
    }
  }
};
</script>