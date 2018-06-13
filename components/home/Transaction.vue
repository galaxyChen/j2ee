<template>
    <el-col :span=15>
        <el-container class="main-window">
            <el-header>
                <el-tabs v-model='activeTab' type='card' @tab-click="handleClick">
                    <el-tab-pane label="全部订单" name="buy_all"></el-tab-pane>
                    <el-tab-pane label="待付款" name="buy_pay"></el-tab-pane>
                    <el-tab-pane label="待收货" name="buy_send"></el-tab-pane>
                    <el-tab-pane label="已完成" name="buy_finish"></el-tab-pane>
                    <el-tab-pane label="已取消" name="buy_cancel"></el-tab-pane>
                </el-tabs>
            </el-header>
            <el-main>
                <Order v-for="order in orderList" :key='order.id' :order='order'></Order>
            </el-main>
        </el-container>
    </el-col>
</template>


<style scoped>
.main-window {
  position: relative;
  top: 50px;
  left: 30px;
}
</style>


<script>
import Order from "~/components/home/Order";
export default {
  components: {
    Order
  },
  props: ["user", "type"],
  data() {
    return {
      activeTab: "buy_all",
      orderList: [{
          id:'1234567',
          time:'2018-01-08 13:02',
          time_limit:'24:14:39',
          title:'三体',
          img:'',
          state:'待收货',
          price:'30',
          mail_price:'10',
          number:'1'
      }]
    };
  },
  methods:{
      handleClick(){

      }
  }
};
</script>

