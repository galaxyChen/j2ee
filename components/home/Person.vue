<template>
    <el-col :span='10' :push='3'>
        <div class='person-main-box'>
            <el-form :inline="true">
                <el-form-item label="昵称">
                    <el-input ref='name' @blur='changeName' :disabled='change' v-model='name'  :placeholder='user_name' @input="checkName"></el-input><a style="color:red;">{{error_name_message}}</a>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeName">修改</el-button>
                </el-form-item>
            </el-form>
            <a class='person-pwtitle'>修改密码</a>
            <el-switch  v-model="changePw"></el-switch>
            <div class='person-change-pw-box'>
                <el-collapse-transition>
                    <el-form v-if='changePw'>
                        <el-input type='password' v-model='oldpw' class='person-input-box'  size='medium'>
                            <template slot='prepend'>旧密码</template>
                        </el-input>
                        <el-input @input='checkPw' type='password' v-model='newpw' class='person-input-box'  size='medium'>
                            <template slot='prepend'>新密码</template>
                        </el-input>
                        <a style="color:red;">{{error_pw_message}}</a>
                        <el-input type='password' v-model='newpw2' class='person-input-box'  size='medium'>
                            <template slot='prepend'>重复新密码</template>
                        </el-input>
                        <el-button @click="changepPw" class="person-changepw-button" type="primary">确认修改</el-button>
                    </el-form>
                </el-collapse-transition>
            </div>
        </div>
    </el-col>
</template>

<style>
.person-pwtitle {
  margin-right: 18px;
  font-size: 18px;
}

.person-main-box {
  margin-top: 60px;
}

.person-question {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
}
.person-input-box {
  margin-top: 10px;
  margin-block-end: 10px;
}

.person-change-pw-box {
  margin-top: 30px;
}

.person-changepw-button {
  margin-top: 20px;
  float: right;
}
</style>


<script>
import Cookies from "js-cookie";
export default {
  mounted() {},
  data() {
    return {
      change: true,
      changePw: false,
      securityQuestion: "你的生日是?",
      name: "",
      answer: "",
      oldpw: "",
      newpw: "",
      newpw2: "",
      error_name_message: "",
      error_pw_message: ""
    };
  },
  methods: {
    checkName(text) {
      let newName = text;
      if (newName == "") {
        this.error_name_message = "请输入昵称";
        return;
      } else if (newName.length > 20) {
        this.error_name_message = "长度不超过20个字";
        return;
      } else {
        let p1 = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
        let p2 = /^[0-9]+$/;
        if (p2.test(newName)) {
          this.error_name_message = "由汉字、字母和数字组成，不允许是纯数字";
          return;
        } else if (!p1.test(newName)) {
          this.error_name_message = "由汉字、字母和数字组成，不允许是纯数字";
          return;
        }
      }
      this.error_name_message = "";
    },
    checkPw(newpw) {
      if (newpw == "") {
        this.error_pw_message = "请输入密码";
        return;
      } else if (newpw.length > 16 || newpw.length < 6) {
        this.error_pw_message = "新密码长度在 6 到 16 个字符";
        return;
      } else {
        let p = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[_])[\da-zA-Z_]+/;
        let p1 = /^[a-z1-9A-Z_]+$/
        if (!p.test(newpw)) {
          this.error_pw_message = "新密码最少包含数字、字母和下划线";
          return;
        }
        if (!p1.test(newpw)) {
          this.error_pw_message = "新密码只能包含数字、字母和下划线";
          return;
        }
      }
    },
    async changeName() {
      console.log("changeName");
      if (this.change) {
        // console.log("allow to change");
        this.change = !this.change;
        this.$refs.name.focus();
      } else {
        let newName = this.name;
        if (newName == "") {
          this.change = !this.change;
          return;
        }
        if (newName == "") {
          this.$message.error("请输入昵称");
          return;
        } else if (newName.length > 20) {
          this.$message.error("长度不超过20个字");
          return;
        } else {
          let p1 = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
          let p2 = /^[0-9]$/;
          if (p2.test(newName)) {
            this.$message.error("由汉字、字母和数字组成，不允许是纯数字");
            return;
          } else if (!p1.test(newName)) {
            this.$message.error("由汉字、字母和数字组成，不允许是纯数字");
            return;
          }
        }
        this.$confirm("确认修改用户名为" + newName + "吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let userId = Cookies.get("userId");
            let sessionId = Cookies.get("sessionId");
            let data = {
              query: "changeName",
              data: {
                userId: userId,
                newName: newName,
                sessionId: sessionId
              }
            };
            return this.$axios.send(data);
          })
          .then(response => {
            if (response.status == 1) {
              this.name = newName;
              Cookies.set("userName", newName);
              this.change = !this.change;
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.$emit("changeName", newName);
            } else if (response.status == -1) {
              this.signout();
            } else {
              this.$message.error("发生错误：" + response.err);
              let oldName = Cookies.get("userName");
              this.change = !this.change;
              this.name = oldName;
            }
          });
      }
    },
    signout() {
      this.$message.error("登录过期!请重新登录");
      Cookies.remove("userName");
      Cookies.remove("userId");
      Cookies.remove("sessionId");
      this.$router.push({ path: "/" });
    },
    async changepPw() {
      console.log(this.answer);
      console.log(this.oldpw);
      console.log(this.newpw);
      let oldpw = this.oldpw;
      let newpw = this.newpw;
      let newpw2 = this.newpw2;
      if (newpw == "") {
        this.$message.error("请输入密码");
        return;
      } else if (newpw.length > 16 || newpw.length < 6) {
        this.$message.error("新密码长度在 6 到 16 个字符");
        return;
      } else {
        let p = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[_])[\da-zA-Z_]+/;
        if (!p.test(newpw)) {
          this.$message.error("新密码最少包含数字、字母和下划线");
          return;
        }
      }
      if (newpw != newpw2) {
        this.$message.error("两次新密码输入不一致！");
        return;
      }
      let userId = Cookies.get("userId");
      let sessionId = Cookies.get("sessionId");
      let data = {
        query: "changePassword",
        data: {
          userId: userId,
          password: oldpw,
          newPassword: newpw,
          sessionId: sessionId
        }
      };
      let response = await this.$axios.send(data);
      if (response.status == 1) {
        this.$message({
          message: "修改成功！",
          type: "success"
        });
      } else if (response.status == -1) {
        this.signout();
      } else {
        this.$message.error("修改失败!" + response.err);
        let oldName = Cookies.get("userName");
        this.change = !this.change;
        this.name = oldName;
      }
    }
  },
  computed: {
    user_name() {
      let name = Cookies.get("userName");
      return name;
    }
  }
};
</script>