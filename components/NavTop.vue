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
          <el-menu-item index="shoppingCar" class="NavRight">购物车</el-menu-item>
          <el-menu-item index="index" class="NavRight">首页</el-menu-item>
          <el-menu-item index="welcome" class="NavRight" >欢迎，{{userName}}</el-menu-item>
        
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
    let userId = Cookies.get("userId");
    if (userId!=undefined) {
      let data = {
        query: "check",
        data: {
          userId: userId,
          sessionId: Cookies.get("sessionId")
        }
      };
      let check = this.$axios.send(data);
      check.then(response => {
        if (response.status == 1) {
          this.login = true;
          this.userName = Cookies.get("userName");
          this.userId = Cookies.get("userId");
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
      userName:'',
      userId:'',
      dialogVisible: false
    };
  },
  methods: {
    changeName(newName){
      console.log('navtop')
      console.log(newName)
      this.userName = newName;
    },
    async handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === "login") {
        this.$refs.login.$emit("openDialog");
      }

      if (key === "home") {
        let userId = Cookies.get("userId");
        let sessionId = Cookies.get("sessionId");
        if (userId && sessionId) {
          let data = {
            query: "check",
            data: {
              userId: userId,
              sessionId: sessionId
            }
          };
          let check = await this.$axios.send(data);
          if (check.status == 1) {
            this.$router.push({ path: `/home/${userId}` ,query:{index:'1'}});
          } else {
            this.signout()
          }
        }
      }

      if (key === "shoppingCar") {
        let userId = Cookies.get("userId");
        let sessionId = Cookies.get("sessionId");
        if (userId && sessionId) {
          let data = {
            query: "check",
            data: {
              userId: userId,
              sessionId: sessionId
            }
          };
          let check = await this.$axios.send(data);
          if (check.status == 1) {
            this.$router.push({ path: `/shoppingCar/${userId}` });
          } else {
            this.signout()
          }
        }
      }

      if (key === "index") {
        this.$router.push({ path: "/" });
      }
    },
    logined() {
      console.log("haha");
      let userName = Cookies.get("userName");
      if (userName) {
        this.userName = userName;
        this.login = true;
      }
    },
    async signout() {
      console.log("sign out");
      let userId = Cookies.get("userId");
      let data = {
        query: "signout",
        data: {
          userId: userId
        }
      };
      let response = await this.$axios.send(data);
      if (response.status === 0) {
        this.$message.error(""+response.err);
      }
      Cookies.remove("userName");
      Cookies.remove("userId");
      Cookies.remove("sessionId");
      this.login = false;
      this.user = {};
      this.$router.push({ path: "/" });
    }
  }
};
</script>