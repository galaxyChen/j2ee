<template>
<div>
  <NavTop :logined='logined' :user='user'></NavTop>
  <addressBook></addressBook>
</div>

</template>


<script>
import NavTop from '~/components/NavTop'
import addressBook from '~/components/addressBook'
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
      NavTop,
      addressBook
    },
    mounted:function(){
      this.$sendTest()
    }
  };
</script>