<template>
    <div :model="totalData">
        <p>商品件数：{{totalData.totalItem}}</p>
        <p>商品总额：{{totalData.totalPay}}</p>
        <p>运费：{{totalData.totalTransportFee}}</p>
        <p>应付总费：{{totalData.totalTransportFee+totalData.totalPay }}</p>
        <el-button type="primary" @click="submitBill">提交订单</el-button>
    </div>
</template>
<script>
export default {
    props:["itemList"],
    mounted() {
        console.log(this.itemList)
        this.itemList.forEach(element => {
            this.totalData.totalItem += element.nums;
            this.totalData.totalPay += element.nums * element.price;
            this.totalData.totalTransportFee += element.transportFee
        });
    },
    data(){
        return {
            totalData:{
                totalItem : 0,
                totalPay : 0,
                totalTransportFee : 0,
            }
        }
    },
    methods:{
        submitBill(){
            // this.$emit('submitBill',)
        }
    }
}
</script>
