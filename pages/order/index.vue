<template>
    <div>
        <!-- <NavBar ref='navtop' :logined='logined' :user='user'></NavBar> -->
        <itemList :tableData="tableData"></itemList>
    </div>
    
</template>


<script>
import Order from '~/components/Order/Order'
import itemList from '~/components/Order/itemList'
// import order from '~/components/shoppingCar/order'
import Cookies from "js-cookie";
import NavBar from "~/components/NavTop";
export default {
    components:{
        Order,
        NavBar,
        itemList
    },
    data(){
        return {
                        tableData : [
                {
                    information:'merlin',
                    price: 518,
                    nums:1,
                }, 
                {
                    information:'lilith',
                    price: 518,
                    nums:1,
                }, 
                {
                    information:'bb',
                    price: 518,
                    nums:1,
                }, 
                {
                    information:'aa',
                    price: 518,
                    nums:1,
                }
            ],
        }
    }
}
</script>
