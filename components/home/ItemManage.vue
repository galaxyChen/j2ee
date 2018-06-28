<template>
    <el-container>
        <el-main>
            <Item v-for="item in itemList" :key="'item'+item.itemId" :item='item'></Item>
        </el-main>
    </el-container>
</template>

<style scoped>

</style>

<script>
import Item from '~/components/home/Item'
export default {
    components:{
        Item
    },
    data(){
        return {
            itemList:[]
        }
    }
}
</script>
