<template>
    <el-col :span=15>
        <el-container v-if="showList" class="main-window">
            <el-header>
                <el-tabs v-model='activeTab' type='card' @tab-click="handleClick">
                    <el-tab-pane label="全部订单" name="all"></el-tab-pane>
                    <el-tab-pane label="待付款" name="pay"></el-tab-pane>
                    <el-tab-pane label="待发货" name="send"></el-tab-pane>
                    <el-tab-pane label="待收货" name="receive"></el-tab-pane>
                    <el-tab-pane label="已签收" name="signed"></el-tab-pane>
                    <el-tab-pane label="已完成" name="finish"></el-tab-pane>
                    <el-tab-pane label="售后中" name="service"></el-tab-pane>
                    <el-tab-pane label="已取消" name="cancel"></el-tab-pane>
                </el-tabs>
            </el-header>
            <el-main>
                <Order @sendOrder='updateOrder' @cancelOrder='updateOrder' @finishOrder='updateOrder' @signOrder='updateOrder' @lookDetail='lookDetail' v-for="order in onShowList" :type='type' :key='order.itemId' :order='order'></Order>
            </el-main>
        </el-container>
        <el-container v-else>
            <el-header>
                <el-button @click="goBack" class="back-button" size="medium" type='text' icon="el-icon-back">返回</el-button>
            </el-header>
            <el-main>
                <OrderDetail :type='type' :order='onShowOrder'></OrderDetail>
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

.back-button {
  color: #999;
  font-size: 30px;
  margin-top: 16px;
}
</style>


<script>
import Order from "~/components/home/Order";
import OrderDetail from "~/components/home/OrderDetail";
import Cookies from "js-cookie";
export default {
  components: {
    Order,
    OrderDetail
  },
  async mounted() {
    this.getOrder();
  },
  props: ["type"],
  data() {
    return {
      activeTab: "all",
      showList: true,
      allOrder: [],
      payOrder: [],
      receiveOrder: [],
      doneOrder: [],
      canceledOrder: [],
      orderList: [],
      onShowList: [],
      onShowOrder: {}
    };
  },
  methods: {
    async getOrder() {
      let query = this.type == 1 ? "getBuyOrder" : "getSellOrder";
      let data = {
        query: query,
        data: {
          userId: Cookies.get("userId"),
          sessionId: Cookies.get("sessionId")
        }
      };
      let response = await this.$axios.send(data);
      if (response.status == 1) {
        this.orderList = response.data.orderList;
        this.updateShowList();
      } else if (response.status == 0) {
        this.$message.error("发生错误" + response.err);
      } else {
        this.signout();
      }
    },
    updateShowList() {
      if (this.activeTab == "all") {
        this.onShowList = this.orderList;
        return;
      }
      let tabs = {
        pay: "等待付款",
        send: "等待发货",
        receive: "等待收货",
        signed: "已签收",
        finish: "已完成",
        cancel: "已取消",
        service: "售后中"
      };
      this.onShowList = this.orderList.filter(item => {
        if (item.orderState == tabs[this.activeTab]) return true;
        else return false;
      });
    },
    handleClick() {
      console.log(this.activeTab);
      this.updateShowList();
    },
    goBack() {
      this.showList = true;
    },
    lookDetail(id) {
      console.log("look detail:" + id);
      for (let item in this.orderList) {
        if (this.orderList[item].orderId == id) {
          console.log(this.orderList[item]);
          this.onShowOrder = this.orderList[item];
          this.showList = false;
          return;
        }
      }
    },
    updateOrder(item) {
      console.log("sign order");
      let index = 0;
      while (this.orderList[index].orderId != item.orderId) index++;
      this.orderList.splice(index, 1, item);
      this.updateShowList();
    }
  },
  watch:{
    type(newType,lodType){
      this.getOrder()
    }
  }
};
</script>

