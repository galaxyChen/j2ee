<template>
    <div>
        <!-- <NavBar ref='navtop' :logined='logined' :user='user'></NavBar> -->
        <Address  :addressList="addressList"></Address>
        <itemList :tableData="itemData"></itemList>
        <confirmBill :itemList="itemData"></confirmBill>
    </div>
    
</template>


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
        // this.getAddress();
    },
    data(){
        return {
            itemData : [
                {
                    information:'aa',
                    price: 518,
                    nums:1,
                    transportFee :1,
                }, 
                {
                    information:'bb',
                    price: 518,
                    nums:1,
                    transportFee :1,                   
                }, 
                {
                    information:'cc',
                    price: 518,
                    nums:1,
                    transportFee :1,                    
                }, 
                {
                    information:'dd',
                    price: 518,
                    nums:1,
                    transportFee :1,                    
                }
            ],
            addressList : [
                {
                    recipientName: "Foo",
                    phoneNumber: "110",
                    addressDetail: "scut",
                    province : "Guangdong",
                    city:"Guangzhou",
                    isDefaultAddress:true,
                    addressId:111
                },
                {
                    recipientName: "Lilith",
                    phoneNumber: "120",
                    province : "moon",
                    city:"moon",
                    addressDetail: "CCC",
                    isDefaultAddress:false,
                    addressId:222
                },
                {
                    recipientName: "merlin",
                    phoneNumber: "518",
                    province : "moon",
                    city:"moon",
                    addressDetail: "avalon",
                    isDefaultAddress: false,
                    addressId: 333
                }
            ],
            defaultIndex :0
        }
    },
    methods:{
        async getAddress(){
            let data = {
                query : "getAddress",
                data : {
                userId : Cookies.get('userId'),
                sessionId : Cookies.get('sessionId')
                }
            }
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.addressList =  response.data.addresses
            }
            else{
                this.$message.error('发生错误：'+response.err);
            }

        }
    }
}
</script>
