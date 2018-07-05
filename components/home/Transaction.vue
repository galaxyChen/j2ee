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
                <Order @sendOrder='updateOrder' @cancelOrder='updateOrder' @finishOrder='updateOrder' @signOrder='updateOrder' @lookServiceDetail='lookServiceDetail' @lookDetail='lookDetail' v-for="order in onShowList" :type='type' :key='"order-"+order.orderId' :order='order'></Order>
            </el-main>
        </el-container>
        <el-container v-else-if="showOrder">
            <el-header>
                <el-button @click="goBack" class="back-button" size="medium" type='text' icon="el-icon-back">返回</el-button>
            </el-header>
            <el-main>
                <OrderDetail @sendOrder='updateOrder' @cancelOrder='updateOrder' @finishOrder='updateOrder' @signOrder='updateOrder' @lookDetail='lookDetail' :type='type' :order='onShowOrder'></OrderDetail>
            </el-main>
        </el-container>

        <el-container v-else>
            <el-header>
                <el-button @click="goBack" class="back-button" size="medium" type='text' icon="el-icon-back">返回</el-button>
            </el-header>
            <el-main>
                <AfterDetail v-if="type==1" :afterService='service'></AfterDetail>
                <AfterSellerDetail v-else :afterSellerService='service'></AfterSellerDetail>
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
import AfterDetail from '~/components/home/AfterDetail';
import AfterSellerDetail from '~/components/home/AfterSellerDetail';
export default {
  components: {
    Order,
    OrderDetail,
    AfterSellerDetail,
    AfterDetail
  },
  async mounted() {
    console.log("now at:" + this.$route.query["index"]);
    if (this.$route.query["index"] == "3-1") this.type = 1;
    else this.type = 2;
    this.getOrder();
  },
  data() {
    return {
      type: 1,
      activeTab: "all",
      showList: true,
      showOrder: false,
      allOrder: [],
      payOrder: [],
      receiveOrder: [],
      doneOrder: [],
      canceledOrder: [],
      orderList: [],
      onShowList: [],
      onShowOrder: {},
      service: {}
    };
  },
  methods: {
    async lookServiceDetail(id) {
      let query = {
        query: "getOneAfterService",
        data: {
          adminId: Cookies.get("adminId"),
          sessionId: Cookies.get("sessionId"),
          afterServiceId: afterServiceId + ""
        }
      };
      let response = await this.$axios.send(query);
      if (response.status == 1) {
        this.service = response.data.service;
        this.showList = false;
        this.showOrder = false;
      } else if (response.status == 0) {
        this.$message.error("发生错误" + response.err);
      } else {
        this.signout();
      }
    },
    async getOrder() {
      this.onShowList = [];
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
      if (this.activeTab == "all" && this.showList) {
        this.onShowList = JSON.parse(JSON.stringify(this.orderList));
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
      this.onShowList =
        this.orderList.filter(item => {
          if (item.orderState == tabs[this.activeTab]) return true;
          else return false;
        }) || [];
      if (!this.showList) {
        let onShowOrder = this.orderList.filter(item => {
          if (item.orderId == this.onShowOrder.orderId) return true;
          else return false;
        })[0];
        this.onShowOrder = onShowOrder;
      }
    },
    handleClick() {
      console.log(this.activeTab);
      this.updateShowList();
    },
    goBack() {
      this.showList = true;
      this.showOrder = false;
      this.updateShowList();
    },
    lookDetail(id) {
      console.log("look detail:" + id);
      for (let item in this.orderList) {
        if (this.orderList[item].orderId == id) {
          console.log(this.orderList[item]);
          this.onShowOrder = this.orderList[item];
          this.showList = false;
          this.showOrder = true;
          return;
        }
      }
    },
    updateOrder(item) {
      let index = 0;
      while (this.orderList[index].orderId != item.orderId) index++;
      this.orderList.splice(index, 1, item);
      this.updateShowList();
    }
  },
  watch: {
    $route(to, from) {
      let index = to.query.index.split("-");
      if (index.length == 2) {
        this.onShowList = [];
        this.showList = true;
        this.showOrder = false;
        this.type = index[1] - 0;
        this.getOrder();
      }
    }
  }
};
</script>

