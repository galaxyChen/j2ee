<template>
    <div >
        <NavBar ref='navtop' ></NavBar>
        <div class="order-box">
            <el-row class="el-row-title" >
                <p>收货地址</p>            
            </el-row>
            <el-row class="el-row1">
                <Address ref="Address" @changeAddress="changeAddress" ></Address>            
            </el-row>

            <el-row class="el-row-title">
                <p>商品信息</p>            
            </el-row>
            <el-row class="el-row1">
                <itemList :itemList="itemList"></itemList> 
            </el-row>

            <el-row class="el-row-title">
                <p>全部明细</p>            
            </el-row>
            <el-row class="el-row1">

                <el-col :span="4" :push="20">
                    <confirmBill  ref="confirmBill" @submitBill="submitBill" :totalList="totalList" ></confirmBill>
                </el-col>

            </el-row>
         </div>
    </div>
    
</template>



<style scope>
.el-row1{
  margin-top: 30px;
  margin-bottom : 20px
}
.el-row-title{
    margin-top: 30px;
    margin-bottom : 20px;
    margin-left : 20px;
}
.order-box {
  border-width: 30px;
  border-color: rgba(228, 228, 228, 1);
  background-color: rgba(255, 255, 255, 1);
  border-style: solid;
}
</style>



<script>
import itemList from '~/components/Order/itemList'
import Address from '~/components/Order/Address'
import confirmBill from '~/components/Order/confirmBill'

import Cookies from "js-cookie";
import NavBar from "~/components/NavTop";
export default {
    components:{
        NavBar,
        itemList,
        Address,
        confirmBill
    },

    mounted(){

        let params = this.$route.params;
        console.log(params)
        let query = this.$route.query;
        console.log(query)
        
        let itemList = Cookies.getJSON("itemList")
        // 这里做个判断itemList 是否为空
        // 为每个商品添加一个邮费项
        itemList.forEach(element => {
            element.postage = 0
        });
        this.itemList = itemList
    },
    data(){
        return {
            itemList : [],
            totalList : [],
            addressItem : '',
            defaultIndex :0
        }
    },
    methods:{
        changeAddress(addressItem){
            let tmp = this.itemList
            let province = addressItem.province
            tmp.forEach( ele=>{
                if(ele.freePostage!=1){
                    if(ele.province!=province){
                        ele.postage = 20
                    }
                    else{
                        ele.postage = 10
                    }
                }
            });

            this.itemList = tmp
            tmp = {
                nums :0,
                pay : 0,
                postage : 0
            }
            this.itemList.forEach( ele => {
                 tmp.nums += ele.nums;
                 tmp.pay += ele.nums * ele.price;
                 tmp.postage += ele.postage;
            })
            this.addressItem = addressItem
            this.totalList = tmp
        },
        // 提交订单
        async submitBill(){
            function number2StrInArr(arr){
                arr.forEach(obj=>{
                    for (let term in obj) {
                        if (obj.hasOwnProperty(term)) {
                            obj[term] = obj[term]+"";
                        }
                    }
                })
                return arr;
            }
            let data = {
                query : 'submitBill',
                data : {
                    userId : Cookies.get('userId'),
                    sessionId : Cookies.get('sessionId'),
                    addressId : this.addressItem.addressId+"",
                    itemList : number2StrInArr(this.itemList),
                }

            }
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.$router.push({ 
                    name: 'Pay' ,
                    params: { 
                        totalPay: this.totalList.pay + this.totalList.postage ,
                        time_limit :'2小时0分',
                    }  
                });
            }
            else{
                this.$message.error('发生错误：'+response.err);
            }
        }
    }
}
</script>
