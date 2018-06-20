<template>
    <div>
        <NavBar ref='navtop' :logined='logined' :user='user'></NavBar>
        <shoppingCar></shoppingCar>
    </div>
    
</template>


<script>
import shoppingCar from '~/components/shoppingCar'
import Cookies from "js-cookie";
import NavBar from "~/components/NavTop";
export default {
    components:{
        shoppingCar,
        NavBar
    }
}
</script>
