<template>
    <el-col :span='10' :push='3'>
        <div class='person-main-box'>
            <el-form :inline="true">
                <el-form-item label="昵称">
                    <el-input ref='name' @blur='changeName' :disabled='change' v-model='name'  :placeholder='user_name'></el-input>
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
                        <a class='person-question'>密保问题：{{question}}</a>
                        <el-input v-model='answer' class='person-input-box' placeholder="密保答案" size='medium'></el-input>
                        <el-input v-model='oldpw' class='person-input-box'  size='medium'>
                            <template slot='prepend'>旧密码</template>
                        </el-input>
                        <el-input v-model='newpw' class='person-input-box'  size='medium'>
                            <template slot='prepend'>新密码</template>
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
  async mounted() {
    let user_id = Cookies.get("user_id");
    let session_id = Cookies.get("session_id");
    let data = {
      query: "getPwQuestion",
      data: {
        user_id: user_id,
        session_id: session_id
      }
    };
    let response = await this.$axios.send(data);
    if (response.status === 1) {
      this.question = response.data.question;
    } else if (response.status === -1) {
      this.signout();
    } else {
      this.$message.error("发生错误：" + response.err);
    }
  },
  data() {
    return {
      change: true,
      changePw: false,
      question: "你的生日是?",
      name: "",
      answer: "",
      oldpw: "",
      newpw: ""
    };
  },
  methods: {
    async changeName() {
      console.log("changeName");
      if (this.change) {
        console.log("allow to change");
        this.change = !this.change;
        this.$refs.name.focus();
      } else {
        let newName = this.name;
        if (newName == "") {
          this.change = !this.change;
          return;
        }
        let user_id = Cookies.get("user_id");
        let session_id = Cookies.get("session_id");
        let data = {
          query: "changeName",
          data: {
            user_id: user_id,
            new_name: newName,
            session_id: session_id
          }
        };
        let response = await this.$axios.send(data);
        console.log(response);
        if (response.status == 1) {
          this.name = newName;
          Cookies.set("name", newName);
        } else if (response.status == -1) {
          this.signout();
        } else {
          this.$message.error("发生错误：" + response.err);
        }
      }
    },
    signout() {
      this.$message.error("登录过期!请重新登录");
      Cookies.remove("name");
      Cookies.remove("user_id");
      Cookies.remove("session_id");
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    user_name() {
      let name = Cookies.get("name");
      return name;
    }
  }
};
</script>