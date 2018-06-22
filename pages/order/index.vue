<template>
      <el-alert
    title="验证失败"
    type="error">
  </el-alert>
</template>

<script>

export default {
  mounted(){
    this.$confirm('请先登录！', '错误', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.$router.push({path:'/'})
        }).catch(()=>{
          this.$router.push({path:'/'})
        })
  }
};
</script>
