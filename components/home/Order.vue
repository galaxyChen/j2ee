<template>
    <el-row>
        <el-row>
            <div class="header">
                <el-col class="header-text" :span='6'>下单时间：{{order.time}}</el-col>
                <el-col class="header-text" :span='6'>订单编号:{{order.id}}</el-col>
                <el-col class="header-text" :span='5' :push='6'>{{getLimit}}</el-col>
            </div>
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
        }
    }
}
</script>
