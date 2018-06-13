<template>
    <div>
      <div v-if="logined">
      <el-menu
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color='None'
        >
        
        <el-menu-item index="home" class="NavLeft">二手书交易平台</el-menu-item>
        <el-menu-item index="home" class="NavRight">退出登录</el-menu-item>
        <el-menu-item index="home" class="NavRight">个人中心</el-menu-item>
        <el-menu-item index="home" class="NavRight">首页</el-menu-item>
        <el-menu-item index="home" class="NavRight" >欢迎，{{user.name}}</el-menu-item>
      
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
        <el-menu-item index="home" class="NavRight">首页</el-menu-item>
      
      </el-menu>
      <Login ref='login' :dialogVisible='dialogVisible'></Login>
    </div>
    </div>
</template>

<style>
.NavRight {
  float: right !important;
}
.NavLeft{
  font-size: 20px;
}
</style>


<script>
import Login from "~/components/loginRegister";
export default {
  components: {
    Login
  },
  props: ["logined", "user"],
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      if (key == "login") {
        // let response = this.$send({ query: "login" });
        // console.log(response);
        this.$refs.login.$emit('openDialog');
      }
    }
  }
};
</script>