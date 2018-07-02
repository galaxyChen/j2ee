<template>
    <el-menu @select='changeTab' :default-active="active">
        <el-menu-item index="1">
            <i class="el-icon-star-on"></i>
            <span slot='title'>处理申诉</span>
        </el-menu-item>

    </el-menu>
</template>

<script>
export default {
    mounted(){
        console.log(this.active)
    },
    props:['active'],
    data(){
        return {}
    },
    methods:{
        changeTab(index,indexPath){
            // console.log(index,indexPath)
            this.$emit('changeTab',index,indexPath)
        }
    }

}
</script>