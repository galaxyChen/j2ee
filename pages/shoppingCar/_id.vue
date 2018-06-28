<template>
    <div>
        <NavBar ref='navtop' ></NavBar>
        <shoppingCar></shoppingCar>
    </div>
    
</template>


<script>
import shoppingCar from '~/components/shoppingCar/shoppingCar'
// import order from '~/components/shoppingCar/order'
import Cookies from "js-cookie";
import NavBar from "~/components/NavTop";
export default {
    components:{
        shoppingCar,
        NavBar,
    }
}
</script>
