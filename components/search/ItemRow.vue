<template>
    <el-row class="row" gutter="40">
        <Item v-for="item in row" :item='item' :key='item.id'></Item>
    </el-row>
</template>

<style scoped>
.row{
    margin-top: 50px;
}
</style>

<script>
import Item from '~/components/search/Item'
export default {
    components:{
        Item
    },
    props:['row'],
    data(){
        return {}
    },
    
}
</script>
