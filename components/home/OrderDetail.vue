<template>
    <div class="order-box">
        <el-row class="header" >
            <el-col class="header-box" :span='4'>
                <i class="el-icon-time state-icon">
                </i>
                <p class="state-text">{{order.orderState}}</p>
            </el-col>
            <el-col class="header-box" :span="4">
                <p style="margin-top:4px;color:#999;">订单编号</p>
                <p style="margin-top:4px;">{{order.orderId}}</p>
            </el-col>
            <el-col class="header-box" :span="4">
                <p style="margin-top:4px;color:#999;">下单时间</p>
                <p style="margin-top:4px;">{{order.purchaseTime}}</p>
            </el-col>
            <el-col class="header-box" :span="4">
                <p v-if="showTimeLimit" style="margin-top:4px;color:#999;">付款截止</p>
                <p v-if="showTimeLimit" style="margin-top:4px;">{{timeLimit}}</p>
            </el-col>
            <el-col  v-if="pay" class="header-box" :span="3" >
                <el-button @click="payOrder" type="danger">立即付款</el-button>
            </el-col>
            <el-col  v-if="signfor" class="header-box" :span="3" >
                <el-button @click="signOrder" type="success">确认收货</el-button>
            </el-col>
            <el-col  v-if="send" class="header-box" :span="3">
                <el-button @click="sendOrder" type="danger">现在发货</el-button>
            </el-col>
            <el-col  v-if="service" class="header-box" :span="3" >
                <el-button @click="requestService" type="warning">申请售后</el-button>
            </el-col>
            <el-col  v-if="finish" class="header-box" :span="3"  :push='1'>
                <el-button @click="finishOrder" type="success">完成订单</el-button>
            </el-col>
            <el-col  v-if="cancel" class="header-box" :span="3"  :push='1'>
                <el-button @click="cancelOrder" type="pain" style='color:rgb(26, 188, 156)'>取消订单</el-button>
            </el-col>
        </el-row>
        <el-row class="step">
            <el-steps align-center class="step-line" :space="200" :active="activeStep" finish-status="success">
                <el-step title="提交订单"></el-step>
                <el-step title="付款成功"></el-step>
                <el-step title="商家发货"></el-step>
                <el-step title="确认收货"></el-step>
                <el-step title="交易完成"></el-step>
            </el-steps>
        </el-row>

        <el-row class="order-detail">
            <div style='font-size:16px;color:#999;padding:14px'>商品信息</div>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="商品信息"
                    width="300">
                    <template slot-scope="scope">
                        <el-col :span='12'>
                            <div>
                                <img class='order-img' :src='scope.row.pictureAddress'/>
                            </div>
                        </el-col>
                        <el-col :span='12'>
                            <h4 class="order-detail-text">{{scope.row.itemTitle}}</h4>
                        </el-col>
                    </template>
                </el-table-column>

                <el-table-column label="数量" prop='quantity'>
                </el-table-column>
                <el-table-column label="邮费" prop='postage'>
                </el-table-column>
                <el-table-column label="单价" prop='price'>
                </el-table-column>
                <el-table-column label="总价" prop='totalPrice'>
                </el-table-column>
                
            </el-table>
        </el-row>
        <el-row>
            <div style='font-size:16px;color:#999;padding:14px;'> 收货信息</div>
            <el-card >
                <div  class="text item">
                    收货人:{{address.recipientName}}
                </div>
                <div  class="text item">
                    联系方式:{{address.phoneNumber}}
                </div>
                <div  class="text item">
                    收货地址:{{addressDetail}}
                </div>
            </el-card>
        </el-row>
        <el-row class="order-summary">
            <el-row class='order-summary-text' >
                <el-col :span='4' :push='15'>
                    商品件数：
                </el-col>
                <el-col style='color:red;' :span='4' :push='15'>
                    {{order.quantity}}
                </el-col>
            </el-row>
            <el-row class='order-summary-text'>
                <el-col :span='4' :push='15'>
                    商品总价：
                </el-col>
                <el-col style='color:red;' :span='4' :push='15'>
                    ￥{{order.price}}
                </el-col>
            </el-row>
            <el-row class='order-summary-text'>
                <el-col :span='4' :push='15'>
                    运费：
                </el-col>
                <el-col style='color:red;' :span='4' :push='15'>
                    ￥{{order.postage}}
                </el-col>
            </el-row>
            <el-row class='order-summary-text'>
                <el-col :span='4' :push='15'>
                    支付总额：
                </el-col>
                <el-col style='color:red;' :span='4' :push='15'>
                    ￥{{order.price+order.postage}}
                </el-col>
            </el-row>       
        </el-row>
    </div>
</template>

<style scoped>
.header {
  border-width: 1px;
  border-color: rgba(228, 228, 228, 1);
  border-style: solid;
  background-color: rgba(249, 249, 249, 1);
  height: 138px;
  display: flex;
}

.order-box {
  border-width: 2px;
  border-color: rgba(228, 228, 228, 1);
  border-style: solid;
  height: 140px;
}

.order-detail {
  margin-top: 30px;
}

.order-detail-text {
  margin-top: 40px;
  margin-left: 20px;
  font-size: 18px;
}

.order-img {
  width: 90px;
  height: 120px;
  margin: 10px;
  vertical-align: text-top;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.step {
  margin-top: 30px;
}

.state-icon {
  font-size: 36px;
  color: rgb(26, 188, 156);
}
.state-text {
  font-size: 20px;
  color: rgb(26, 188, 156);
}
.header-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.order-summary {
  text-align: right;
}
.order-summary-text {
  margin-top: 20px;
}

.order-summary-text:last-child {
  margin-bottom: 20px;
}
</style>

<script>
import Cookies from "js-cookie";
export default {
  async mounted() {
    let data = {
      query: "getAddressDetail",
      data: {
        userId: Cookies.get("userId"),
        sessionId: Cookies.get("sessionId"),
        addressId: this.order.addressId
      }
    };
    let response = await this.$axios.send(data);
    if (response.status == 1) {
      this.address = response.data;
    } else if (response.status == 0) {
      this.$message.error("发生错误" + response.err);
    } else {
      this.$message.error("登录超时！");
      Cookies.remove("userId");
      Cookies.remove("sessionId");
      Cookies.remove("userName");
      this.$router.push({ path: "/" });
    }
  },
  props: ["order", "type"],
  data() {
    return {
      address: {}
    };
  },
  computed: {
    activeStep() {
        if (this.order.orderState == '等待付款') return 1;
        if (this.order.orderState == '等待发货') return 2;
        if (this.order.orderState == '等待收货') return 3;
        if (this.order.orderState == '已签收') return 4;
        if (this.order.orderState == '已完成') return 5;
    },
    showTimeLimit() {
      if (this.order.orderState == "等待付款") {
        return true;
      } else return false;
    },
    tableData() {
      return [this.order];
    },
    timeLimit() {
      return "15分钟";
    },
    addressDetail() {
      return (
        this.address.province +
        " " +
        this.address.city +
        " " +
        this.address.addressDetail
      );
    },
    pay() {
      if (this.type == 1 && this.order.orderState == "等待付款") return true;
      else return false;
    },
    signfor() {
      if (
        this.type == 1 &&
        this.order.orderState == "等待收货" &&
        this.type == 1
      )
        return true;
      else return false;
    },
    service() {
      if (this.type == 1 && this.order.orderState == "已签收") return true;
      else return false;
    },
    finish() {
      if (this.type == 1 && this.order.orderState == "已签收") return true;
      else return false;
    },
    serviceDetail() {
      if (this.order.orderState == "售后中") return true;
      else return false;
    },
    cancel() {
      if (this.type == 1 && this.order.orderState == "等待付款") return true;
      else return false;
    },
    send() {
      // console.log(this.type);
      if (this.order.orderState == "等待发货" && this.type == 2) return true;
      else return false;
    }
  },
  methods: {
    signout() {
      this.$message.error("登录超时！");
      Cookies.remove("userId");
      Cookies.remove("sessionId");
      Cookies.remove("userName");
      this.$router.push({ path: "/" });
    },
    payOrder() {
      //进入结算页面
      let orderId = []
      orderId.push(this.order.orderId)
      this.$router.push({ 
          name: 'Pay' ,
          params: { 
              totalPay: this.order.price + this.order.postage ,
              orderId : orderId,
              time_limit :'2小时0分',
          }  
      });

    },
    signOrder() {
      this.$confirm("确认收货吗?", "收货确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let data = {
          query: "signOrder",
          data: {
            userId: Cookies.get("userId"),
            sessionId: Cookies.get("sessionId"),
            orderId: this.order.orderId
          }
        };
        let response = await this.$axios.send(data);
        if (response.status == 1) {
          let item = JSON.parse(JSON.stringify(this.order));
          item.orderState = "已签收";
          this.$message({
            message: "签收成功!",
            type: "success"
          });
          this.$emit("signOrder", item);
        } else if (response.status == 0) {
          this.$message.error("发生错误：" + response.err);
        } else {
          this.signout();
        }
      });
    },
    requestService() {},
    finishOrder() {
      this.$confirm("确认完成订单吗?", "完成确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let data = {
          query: "finishOrder",
          data: {
            userId: Cookies.get("userId"),
            sessionId: Cookies.get("sessionId"),
            orderId: this.order.orderId
          }
        };
        let response = await this.$axios.send(data);
        if (response.status == 1) {
          let item = JSON.parse(JSON.stringify(this.order));
          item.orderState = "已完成";
          this.$message({
            message: "订单已成功完成！",
            type: "success"
          });
          this.$emit("finishOrder", item);
        } else if (response.status == 0) {
          this.$message.error("发生错误：" + response.err);
        } else {
          this.signout();
        }
      });
    },
    lookServive() {},
    async sendOrder() {
      this.dialogFormVisible = false;
      let sender = this.sendGood.sender;
      let code = this.sendGood.code;
      if (sender != "" && code != "") {
        let data = {
          query: "sendOrder",
          data: {
            userId: Cookies.get("userId"),
            sessionId: Cookies.get("sessionId"),
            expressCode: code,
            express_company: sender,
            orderId:this.item.orderId
          }
        };
        let response = await this.$axios.send(data);
        if (response.status == 1) {
          let item = JSON.parse(JSON.stringify(this.order));
          item.orderState = "等待收货";
          this.$message({
            message: "订单已发货！",
            type: "success"
          });
          this.sendGood = {
            sender: "",
            code: ""
          };
          this.$emit("sendOrder", item);
        } else if (response.status == 0) {
          this.$message.error("发生错误：" + response.err);
        } else {
          this.signout();
        }
      }
    },
    cancelOrder() {
      this.$confirm("确认取消订单吗?", "完成确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let data = {
          query: "cancelOrder",
          data: {
            userId: Cookies.get("userId"),
            sessionId: Cookies.get("sessionId"),
            orderId: this.order.orderId+""
          }
        };
        let response = await this.$axios.send(data);
        if (response.status == 1) {
          let item = JSON.parse(JSON.stringify(this.order));
          item.orderState = "已取消";
          this.$message({
            message: "订单已取消！",
            type: "success"
          });
          this.$emit("cancelOrder", item);
        } else if (response.status == 0) {
          this.$message.error("发生错误：" + response.err);
        } else {
          this.signout();
        }
      });
    }
  }
};
</script>
