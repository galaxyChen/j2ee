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
        <Login @logined='logined' ref='login' :dialogVisible='dialogVisible'></Login>
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
import Cookies from 'js-cookie'
export default {
  mounted(){
    //预登录
  },
  components: {
    Login
  },
  data() {
    return {
      login:false,
      user:{
        name:'张三',
        user_id:'1'
      },
      dialogVisible: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key,keyPath)
      if (key === "login") {
        this.$refs.login.$emit('openDialog');
      }
      if (key === "home"){
        let user_id = Cookies.get('user_id')
        if (user_id){
          this.$router.push({path:`/home/${user_id}`})
        } else {
          this.$message.error('操作失败!请重新登录');
        }
      }
      if (key==='index'){
        this.$router.push({path:'/'})
      }
    },
    logined(){
      let name = Cookies.get('name')
      if (name){
        this.user.name = name;
        this.logined = true;
      }
    },
    async signout(){
      console.log('sign out')
      let user_id = Cookies.get('user_id')
      let data = {
        query:'signout',
        data:{
          user_id:user_id
        }
      }
      let response = await this.$send(data)
      if (response.status===1){
        Cookies.remove('name')
        Cookies.remove('user_id')
        Cookies.remove('session_id')
        this.login = false;
        this.user = {}
      } else {
          this.$message.error('操作失败!'+response.err);
      }
    }
  }
};
</script>