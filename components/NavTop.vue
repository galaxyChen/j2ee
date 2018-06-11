<template>
    <div>
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <el-menu-item index="login" class="NavRight">登录/注册</el-menu-item>
        <el-menu-item index="home" class="NavRight">首页</el-menu-item>
      
      </el-menu>
      <Login :dialogVisible='dialogVisible'></Login>
    </div>
</template>

<style>
.NavRight {
  float: right;
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
      activeIndex: "1",
      dialogVisible: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == "login") {
        dialogVisible = true;
      }
    }
  }
};
</script>