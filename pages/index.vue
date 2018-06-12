<template>
  <NavTop :logined='logined' :user='user'></NavTop>
</template>


<script>
import NavTop from '~/components/NavTop'
export default {  
    data(){
      return {
        logined:true,
        user:{
          name:'张三'
        }
      }
    },
    components:{
      NavTop
    },
    mounted:function(){
      this.$sendTest()
    }
  };
</script>