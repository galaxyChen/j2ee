<template>
    <div>
        <NavTop></NavTop>
        <el-row>
            <el-col :span='11' :offset="1">
                <div style="border-style:solid;border-color:#cccccc;margin-top:10px;margin-left:10px;">
                    <img class='item-img' :src='item.pictureAddress'/>
                </div>
            </el-col>
            <el-col :span='9'  style="margin-top:10px;margin-left:130px;">
                <Detail :item='item'></Detail>
            </el-col>
        </el-row>
        <el-row class='item-more'>
            <el-col :span='17' :push='3'>
                <el-container>
                    <el-header>
                        <el-tabs v-model='activeTab' type='card' @tab-click="handleClick">
                            <el-tab-pane label="商品详情" name="detail"></el-tab-pane>
                            <el-tab-pane label="用户问答" name="question"></el-tab-pane>
                        </el-tabs>
                    </el-header>
                    <el-main>
                        <component :is='currentComponent' :item='item'></component>
                    </el-main>
                </el-container>
            </el-col>
        </el-row>
    </div>
</template>

<style>
    .item-more{
        position: relative;
        top: 60px;
    }
    .item-img{
        margin: 30px;
        padding-bottom:60px;
        height: 400px;
        width: 400px;
        position: relative;
        left: 120px;
        top: 30px;
    }
    .item-line{
        width: 100%;
        height: 0;
        border-width: 1px;
        border-style: dashed;
    }
    .item-price{
        color:red;
    }
    .item-detail{
        font-size: 20px;
        position: relative;
        right: 100px;
        top: 50px;
    }
    .item-row {
        margin-top: 40px;
    }
    .item-add{
        position: relative;
        top: 40px;
        left: 400px;
    }
</style>

<script>
import NavTop from '~/components/NavTop'
import Detail from '~/components/item/Detail'
import Describe from '~/components/item/Describe'
import Question from '~/components/item/Question'
export default {
    async mounted(){
        console.log(this.$route.params.id)
        let data = {
            query:'getItemDetail',
            data:{
                itemId:this.$route.params.id
            }
        }
        let response = await this.$axios.send(data)
        if (response.status==1){
            this.item = response.data.product;
        } else {
            this.$message.error("发生错误："+response.err)
        }
    },
    components:{
        NavTop,
        Detail,
        Describe,
        Question
    },
    data(){
        return {
            number:1,
            activeTab:'detail',
            currentComponent:'Describe',
            item:{}
        }
    },
    methods:{
        handleClick(tab){
            let com = {
                'detail':'Describe',
                'question':'Question'
            }
            this.activeTab = tab.name;
            this.currentComponent = com[tab.name]
        }
    }
}
</script>
