<template>
    <div>
      <el-menu
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color='None'
        >
        <el-menu-item index="login" class="NavRight">登录/注册</el-menu-item>
        <el-menu-item index="home" class="NavRight">首页</el-menu-item>
      
      </el-menu>
      <Login ref='login' :dialogVisible='dialogVisible'></Login>
    </div>
</template>

<style>
.NavRight {
  float: right!important;
}
</style>


<script>
import Login from "~/components/loginRegister";
export default {
  components: {
    Login
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == "login") {
        // this.$send({'test':1})
        this.$refs.login.$emit('openDialog');
      }
    }
  }
};
</script>