<template>
    <div>
        <NavBar :logined='logined' :user='user'></NavBar>
        <el-col :span="5">
            <NavLeft></NavLeft>
        </el-col>
        <el-col :span='10' :push='3'>
            <Person :user='user'></Person>
        </el-col>
    </div>
</template>

<script>
import NavBar from "~/components/NavTop";
import NavLeft from "~/components/home/NavLeft"
import Person from "~/components/home/Person"
export default {
  components: {
    NavBar,NavLeft,Person
  },
  data() {
    return {
        logined:true,
        user:{
            name:'张三'
        }
    };
  }
};
</script>
