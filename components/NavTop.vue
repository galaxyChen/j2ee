<template>
    <div>
      <div v-if="login">
        <el-menu
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color='None'
          >
          
          <el-menu-item index="logo" class="NavLeft">二手书交易平台</el-menu-item>
          <el-menu-item @click="signout" index="signout" class="NavRight">退出登录</el-menu-item>
          <el-menu-item index="home" class="NavRight">个人中心</el-menu-item>
          <el-menu-item index="index" class="NavRight">首页</el-menu-item>
          <el-menu-item index="welcome" class="NavRight" >欢迎，{{user.name}}</el-menu-item>
        
        </el-menu>
        <Login ref='login' :dialogVisible='dialogVisible'></Login>
      </div>
    <div v-else>
      <el-menu
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color='None'
        >
        <el-menu-item index="home" class="NavLeft">二手书交易平台</el-menu-item>
        <el-menu-item index="login" class="NavRight">登录/注册</el-menu-item>
        <el-menu-item index="index" class="NavRight">首页</el-menu-item>
      
      </el-menu>
      <Login ref='login' @logined="logined"  :dialogVisible='dialogVisible'></Login>
    </div>
    </div>
</template>

<style>
.NavRight {
  float: right !important;
}
.NavLeft {
  font-size: 20px;
}
</style>


<script>
import Login from "~/components/loginRegister";
import Cookies from "js-cookie";
export default {
  mounted() {
    //事件注册
    this.$on('changeName',this.changeName)
    //预登录
    let user_id = Cookies.get("user_id");
    if (user_id!=undefined) {
      let data = {
        query: "check",
        data: {
          user_id: user_id,
          session_id: Cookies.get("session_id")
        }
      };
      let check = this.$axios.send(data);
      check.then(response => {
        if (response.status === 1) {
          this.login = true;
          this.user.name = Cookies.get("name");
          this.user.user_id = Cookies.get("user_id");
        }
      });
    }
  },
  components: {
    Login
  },
  data() {
    return {
      login: false,
      user: {
        name: "张三",
        user_id: "1"
      },
      dialogVisible: false
    };
  },
  methods: {
    changeName(){
      let name = Cookies.get('name')
      this.user.name = name;
    },
    async handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === "login") {
        this.$refs.login.$emit("openDialog");
      }

      if (key === "home") {
        let user_id = Cookies.get("user_id");
        let session_id = Cookies.get("session_id");
        if (user_id && session_id) {
          let data = {
            query: "check",
            data: {
              user_id: user_id,
              session_id: session_id
            }
          };
          let check = await this.$axios.send(data);
          if (check.status === 1) {
            this.$router.push({ path: `/home/` });
          } else {
            this.$message.error("操作失败!请重新登录");
            Cookies.remove("name");
            Cookies.remove("user_id");
            Cookies.remove("session_id");
            this.login = false;
            this.user = {};
            this.$router.push({ path: "/" });
          }
        }
      }

      if (key === "index") {
        this.$router.push({ path: "/" });
      }
    },
    logined() {
      console.log("haha");
      let name = Cookies.get("name");
      if (name) {
        this.user.name = name;
        this.login = true;
      }
    },
    async signout() {
      console.log("sign out");
      let user_id = Cookies.get("user_id");
      let data = {
        query: "signout",
        data: {
          user_id: user_id
        }
      };
      let response = await this.$axios.send(data);
      if (response.status === 0) {
        this.$message.error(""+response.err);
      }
      Cookies.remove("name");
      Cookies.remove("user_id");
      Cookies.remove("session_id");
      this.login = false;
      this.user = {};
      this.$router.push({ path: "/" });
    }
  }
};
</script>