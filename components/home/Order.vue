<template>
    <el-row>
        <el-row>
            <div class="header">
                <el-col class="header-text" :span='6'>下单时间：{{order.time}}</el-col>
                <el-col class="header-text" :span='6'>订单编号:{{order.id}}</el-col>
                <!-- <el-col class="header-text" :span='5' :push='6'>{{getLimit}}</el-col> -->
            </div>
        </el-row>
        <el-row>
            <el-col class='order-box' :span='4'>
                <div >
                    <img class='order-book' src='~/static/book.png'/>
                </div>
            </el-col>
            <el-col class='order-box' :span="8">
                <h4 class="order-title-text">{{order.title}}</h4>
                <a class="order-title-text">数量：{{order.number}}</a>
            </el-col>
            <el-col class='order-box' :span="4">
                <h4 class="order-title-text order-title-text-middle">{{order.state}}</h4>
            </el-col>
            <el-col class='order-box' :span="4">
                <h4 class="order-title-text">￥{{order.price}}</h4>
                <a class="order-title-text">运费:￥{{order.mail_price}}</a>
            </el-col>
            <el-col class='order-box' :span="4">
                <el-button class="order-button" size='small' type='danger'>{{button_text}}</el-button>
                 <a  class="order-button-text">查看详情</a>
                <!-- <a  class="order-button-text">取消订单</a> -->
            </el-col>
        </el-row>
    </el-row>
</template>


<style scoped>
    .header{
        background-color: rgb(249, 249, 249);
        height: 40px;
        
    }
    .header-text{
        line-height: 30px;
        margin: 5px 0 5px 10px;
    }
    .order-book{
        width: 90px;
        height: 120px;
        margin: 10px;
    }

    .order-box{
        border-width: 2px 2px 2px 0;
        border-style: solid;
        border-color: rgb(249, 249, 249);
        height: 140px;
    }
    .order-box:first-child{
        border-left-width: 2px;
    }
    .order-title-text{
        margin-left: 30px;
        margin-bottom: 10px;
        margin-top: 20px;
    }
    .order-title-text-middle{
        margin-top: 40px;
    }
    .order-button{
        margin-left:40px;
        margin-top: 20px;
    }
    .order-button-text{
        margin-left: 50px;
        margin-top: 10px;
        font-size: 14px;
        color: rgb(108, 105, 107);
        display: block;
        text-decoration: none;
    }
    .order-button-text:hover{
        text-decoration: underline;
        cursor: pointer;
    }
</style>

<script>
export default {
    props:['order'],
    data(){
        return {

        }
    },
    computed:{
        getLimit(){
            if (this.order.time_limit){
                let time = this.order.time_limit.split(':');
                let t = ''
                if (time.length===3)
                    t = time[0]+'时'+time[1]+'分'+time[2]+'秒';
                else if (time.length===2)
                    t = time[0]+'分'+time[1]+'秒';
                if (this.order.state==='待付款'){
                    return "付款剩余:"+t;
                }
                if (this.order.state==='待收货'){
                    return '收货确认剩余'+t;
                }
            }
        },
        button_text(){
            if (this.order.state==='待收货')
                return "确认收货";
            if (this.order.state==='待付款')
                return "立即支付";
            if (this.order.state==='待发货')
                return "发货"
            if (this.order.state==='已完成')
                return "申请退货"
        }
    }
}
</script>
