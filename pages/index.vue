<template>
  <NavTop></NavTop>
</template>


<script>
import NavTop from '~/components/NavTop'
export default {  
    components:{
      NavTop
    },
    mounted:function(){
      this.$sendTest()
    }
  };
</script>