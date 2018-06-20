<template>
    <div>
        <NavTop :logine='logined'></NavTop>
        <el-row>
            <el-col :span='12'>
                <div>
                    <img class='item-img' src='~/static/book.png'/>
                </div>
            </el-col>
            <el-col :span='9'>
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
        height: 400px;
        width: 300px;
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
    mounted(){
        console.log(this.$route.params.id)
    },
    components:{
        NavTop,
        Detail,
        Describe,
        Question
    },
    data(){
        return {
            logined:false,
            number:1,
            activeTab:'detail',
            currentComponent:'Describe',
            item:{
                title:"三体",
                author:"刘慈欣",
                publisher:"重庆出版社",
                publish_date:"2008.1.1",
                seller:'张三',
                mail_free:"是",
                date:"2018.1.1",
                price:15,
                store:2,
                describe:"全新三体，未拆封"
            }
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
