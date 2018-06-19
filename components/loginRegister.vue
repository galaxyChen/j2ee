<template>

    <el-dialog title="用户登录注册" :visible.sync="visible" @closed='closeDialog' width="30%" > 

        <el-tabs v-model="query" type="card" >
            <el-tab-pane label="登录" name="login"></el-tab-pane>
            <el-tab-pane label="注册" name="register"></el-tab-pane>

            <el-form  ref="loginForm" status-icon :model="loginForm" :rules="loginRules"  label-width="80px" v-show="query=='login'">
                <el-form-item label="登录邮箱" prop="usn">
                    <el-input  @input='check("loginForm","usn")' v-model="loginForm.usn"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pw">
                    <el-input  @input='check("loginForm","pw")' type="password" v-model="loginForm.pw"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')">确定</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>

            <el-form  ref="regForm" status-icon :model="regForm"  :rules="regRules"  label-width="80px" v-show="query=='register'">
                <el-form-item label="注册邮箱" prop="email">
                    <el-input  @input='check("regForm","email")'  v-model="regForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pw">
                    <el-input  @input='check("regForm","pw")' type="password" v-model="regForm.pw"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="pw2"> 
                    <el-input @input='check("regForm","pw2")' type="password" v-model="regForm.pw2"></el-input>
                </el-form-item>
                
                <el-form-item label="昵称" prop="usn">
                    <el-input @input='check("regForm","usn")' v-model="regForm.usn"></el-input>
                </el-form-item>
                <el-form-item label="密保问题" prop="question">
                    <el-input @input='check("regForm","question")' type="textarea" maxlength=100 v-model="regForm.question" placeholder="不超过100个字符"></el-input>
                </el-form-item>

                <el-form-item label="密保回答" prop="answer">
                    <el-input @input='check("regForm","answer")' type="textarea" maxlength=50 v-model="regForm.answer" placeholder="不超过50个字符"></el-input>
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
import Cookies from 'js-cookie'

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
      else if(value.length>16 || value.length <5){
        callback(new Error("长度在 5 到 16 个字符"));
      } 
      else {
        let p = /[0-9]/ ;
        let p1 = /[a-zA-Z]/i
        if(!p.test(value)){
          callback(new Error("密码至少包含数字和字母"));
        }
        else if (this.regForm.pw2 !== "") {
          this.$refs.regForm.validateField("pw2");
        }
        callback();
      }
    };
    var validatePw2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.regForm.pw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      visible: false,
      loginForm: {
        usn: "",
        pw: ""
      },
      regForm: {
        usn: "",
        email: "",
        pw: "",
        pw2: "",
        question: "",
        answer: ""
      },
      query: "login",
      loginRules: {
        usn: [
          {
            type: "email",
            required: true,
            message: "请输出正确的邮箱",
            trigger: "blur"
          },
          { min: 1, max: 30, message: "长度小于30个字符", trigger: "blur" }
        ],
        pw: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur" }
        ]
      },
      regRules: {
        email: [
          {
            type: "email",
            required: true,
            message: "请输出正确的邮箱",
            trigger: "blur"
          },
          { min: 1, max: 30, message: "长度小于30个字符", trigger: "blur" }
        ],
        usn: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "长度小于20个字符", trigger: "blur" }
        ],
        pw: [{ required: true, validator: validatePw, trigger: "blur" }],
        pw2: [{ required: true, validator: validatePw2, trigger: "blur" }],
        question: [
          { required: true, message: "密保问题不能为空", trigger: "blur" },
          { min: 1, max: 100, message: "长度小于100个字符", trigger: "blur" }
        ],
        answer: [
          { required: true, message: "密保回答不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "长度小于50个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    check(formName,item) {
      console.log(this.$refs[formName])
      this.$refs[formName].validateField(item)
    },
    submitForm: function(formName) {
      console.log("login"+formName)
      function serialize(obj) {
        let result = {};
        for (let term in obj) {
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

          if(data.query=="login")
            this.applyLogin(response)
          else if(data.query == "register"){
            if(this.applyRegister(response)){
              let newData = {
                query :"login",
                data:{
                  
                  usn : data.data.email,
                  pw : data.data.pw
                }

              }
              let response = await this.$axios.send(newData);
              this.applyLogin(response)
            }
          }
        
        } else {
          console.log("error");
        }
      });
    },


    async applyLogin(data){

      let response = await this.$axios.send(data);
      if (response.status==1){
        console.log("login success")
        Cookies.set('user_id',response.data.user_id);
        Cookies.set('name',response.data.name);
        Cookies.set('session_id',response.data.session_id);
        this.$emit("logined")

        this.visible = false;
      } else {
        console.log("error")
        this.$message.error('发生错误：'+response.err);
      }  
    },
    async applyRegister(data){
      
      if (response.status==1){
        console.log("register success")
        let newData = {
          query :"login",
          usn : data.usn,
          pw :data.pw
        }
        this.applyLogin(newData)
      } else {
        console.log("error")
        this.$message.error('发生错误：'+response.err);
        return false;
      }  
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeDialog() {
      this.$refs["regForm"].resetFields();
      this.$refs["loginForm"].resetFields();
    }
  }
};
</script>