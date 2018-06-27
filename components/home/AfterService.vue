<template>
    <el-tabs v-model="service" type="card" @tab-click="handleClick">
    <el-tab-pane label="售后申请" name="first">售后申请</el-tab-pane>
    <el-tab-pane label="申请记录" name="second">申请记录</el-tab-pane>
  </el-tabs>
</template>

<script>
    export default {
        data(){
            return{
                service:'first'
            }
        },
        methods:{
            handleClick(tab, event) {
            console.log(tab, event);
            }
        }
}
</script>
