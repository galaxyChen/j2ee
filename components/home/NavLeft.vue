<template>
    <el-menu @select='changeTab' :default-active="active">

        <el-menu-item index="1">
            <i class="el-icon-star-on"></i>
            <span slot='title'>个人信息管理</span>
        </el-menu-item>

        <el-menu-item index="2" >
            <i class="el-icon-document"></i>
            <span slot="title">地址簿管理</span>
        </el-menu-item>

        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-star-on"></i>
                <span>交易管理</span>
            </template>
            <el-menu-item-group>
            <el-menu-item index="3-1">购买管理</el-menu-item>
            <el-menu-item index="3-2">出售管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>


        <el-menu-item index="4">
            <i class="el-icon-message"></i>
            <span slot="title">消息管理</span>
        </el-menu-item>

        <el-menu-item index="5">
            <i class="el-icon-message"></i>
            <span slot="title">发布商品</span>
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
