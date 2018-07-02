<template>
    <el-container>
        <el-header>
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
            <el-tab-pane label="全部信息" name="item"></el-tab-pane>
            <el-tab-pane label="商品信息" name="item"></el-tab-pane>
            <el-tab-pane label="订单信息" name="order"></el-tab-pane>
            <el-tab-pane label="售后信息" name="service"></el-tab-pane>
        </el-tabs>
        </el-header>
        <el-main></el-main>
    </el-container>
</template>

<style scoped>

</style>

<script>
export default {
    data(){
        return {
            activeTab:"item"
        }
    },
    methods:{
        handleClick(tab){
            console.log(tab.name)
        }
    }
}
</script>
