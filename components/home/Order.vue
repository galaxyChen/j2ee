<template>
    <el-row>
        <el-row>
            <div class="header">
                <el-col class="header-text" :span='6'>下单时间：{{order.purchaseTime}}</el-col>
                <el-col class="header-text" :span='6'>订单编号:{{order.orderId}}</el-col>
                <!-- <el-col class="header-text" :span='5' :push='6'>{{getLimit}}</el-col> -->
            </div>
        </el-row>
        <el-row>
            <el-col class='order-box' :span='4'>
                <div >
                    <img @click="lookItemDetail" class='order-book' :src='order.pictureAddress'/>
                </div>
            </el-col>
            <el-col class='order-box' :span="8">
                <h4 @click="lookItemDetail" class="order-title-text">{{order.itemTitle}}</h4>
                <a class="order-title-text">数量：{{order.quantity}}</a>
            </el-col>
            <el-col class='order-box' :span="4">
                <h4 class="order-title-text order-title-text-middle">{{order.orderState}}</h4>
            </el-col>
            <el-col class='order-box' :span="4">
                <h4 class="order-title-text">￥{{order.price}}</h4>
                <a class="order-title-text">运费:￥{{order.postage}}</a>
            </el-col>
            <el-col class='order-box' :span="4">
                <el-button @click="payForOrder" v-if='pay' class="order-button" size='small' type='danger'>立即付款</el-button>
                <el-button @click="signOrder" v-if='signfor' class="order-button" size='small' type='success'>确认签收</el-button>
                <el-button @click="dialogFormVisible = true" v-if='send' class="order-button" size='small' type='success'>现在发货</el-button>
                <el-button @click="requestService" v-if='service' class="order-button" size='small' type='warning'>申请售后</el-button>
                <el-button @click="finishOrder" v-if='finish' class="order-button" size='small' type='success'>完成订单</el-button>
                <el-button v-if='detail' @click="lookDetail" type="text"  class="order-button-text">查看详情</el-button>
                <el-button @click="lookServive" v-if='serviceDetail' type="text"  class="order-button-text">查看售后详情</el-button>
                <el-button @click="cancelOrder" v-if='cancel' type="text"  class="order-button-text">取消订单</el-button>
            </el-col>
        </el-row>
        <el-dialog title="发货" :visible.sync="dialogFormVisible">
         <el-form :model="sendGood" :rules="rules">
            <el-form-item label="快递公司" prop='firm'>
              <!-- <el-input v-model="sendGood.sender" placeholder="请输入快递公司"></el-input> -->
              <el-cascader
                :options="options"
                v-model="sendGood.sender"
                placeholder="请选择快递公司"
                @change="handleChange"
               >
              </el-cascader>
            </el-form-item>
            <el-form-item label="快递单号" prop='code'>
              <el-input v-model="sendGood.code" placeholder="请输入快递单号">
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendOrder">确 定</el-button>
          </div>
        </el-dialog>
    </el-row>
</template>


<style scoped>
.header {
  background-color: rgb(249, 249, 249);
  height: 40px;
}
.header-text {
  line-height: 30px;
  margin: 5px 0 5px 10px;
}
.order-book {
  width: 90px;
  height: 120px;
  margin: 10px;
}

.order-box {
  border-width: 2px 2px 2px 0;
  border-style: solid;
  border-color: rgb(249, 249, 249);
  height: 140px;
}
.order-box:first-child {
  border-left-width: 2px;
}
.order-title-text {
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.order-title-text-middle {
  margin-top: 40px;
}
.order-button {
  margin-left: 40px;
  margin-top: 10px;
}
.order-button-text {
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: -20px;
  font-size: 14px;
  color: rgb(108, 105, 107);
  display: block;
  text-decoration: none;
}
.order-button-text:hover {
  text-decoration: underline;
}
</style>

<script>
import Cookies from "js-cookie";
export default {
  props: ["order", "type"],
  data() {
    let validateCode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入快递单号"));
      } else {
        let p = /^[0-9a-zA-Z]+$/;
        if (!p.test(value)) {
          callback(new Error("请输入快递单号"));
        } else {
          callback();
        }
      }
    };
    return {
      options: [
        {
          value: "顺丰",
          label: "顺丰"
        },
        {
          value: "京东",
          label: "京东"
        },
        {
          value: "韵达",
          label: "韵达"
        },
        {
          value: "中通",
          label: "中通"
        },
        {
          value: "圆通",
          label: "圆通"
        },
        {
          value: "申通",
          label: "申通"
        },
        {
          value: "百世汇通",
          label: "百世汇通"
        },
        {
          value: "天天",
          label: "天天"
        },
        {
          value: "邮政",
          label: "邮政"
        },
        {
          value: "当当",
          label: "当当"
        },
        {
          value: "亚马逊",
          label: "亚马逊"
        },
        {
          value: "如风达",
          label: "如风达"
        },
        {
          value: "快捷",
          label: "快捷"
        },
        {
          value: "德邦",
          label: "德邦"
        },
        {
          value: "万象",
          label: "万象"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      rules: {
        code: [
          { validator: validateCode, trigger: "change" },
          {
            min: 1,
            max: 15,
            message: "长度应在15字符内！",
            trigger: "change"
          }
        ]
      },
      dialogFormVisible: false,
      sendGood: {
        sender: [],
        code: ""
      }
    };
  },
  computed: {
    getLimit() {
      if (this.order.time_limit) {
        let time = this.order.time_limit.split(":");
        let t = "";
        if (time.length === 3)
          t = time[0] + "时" + time[1] + "分" + time[2] + "秒";
        else if (time.length === 2) t = time[0] + "分" + time[1] + "秒";
        if (this.order.state === "待付款") {
          return "付款剩余:" + t;
        }
        if (this.order.state === "待收货") {
          return "收货确认剩余" + t;
        }
      }
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
    detail() {
      return true;
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
    lookItemDetail() {
      this.$router.push({ path: `/item/${this.order.itemId}` });
    },
    handleChange() {
      console.log(this.sendGood.sender);
    },
    signout() {
      this.$message.error("登录超时！");
      Cookies.remove("userId");
      Cookies.remove("sessionId");
      Cookies.remove("userName");
      this.$router.push({ path: "/" });
    },
    lookDetail() {
      this.$emit("lookDetail", this.order.orderId);
    },
    payForOrder() {
      //进入结算页面
      let orderId = [];
      orderId.push(this.order.orderId);
      this.$router.push({
        name: "Pay",
        params: {
          totalPay: this.order.price + this.order.postage,
          orderId: orderId,
          time_limit: "2小时0分"
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
            orderId: this.order.orderId + ""
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
    requestService() {
      this.$emit('requestService',this.order.orderId)
    },
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
            orderId: this.order.orderId + ""
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
    lookServive() {
      this.$emit("lookServiceDetail", this.order.afterServiceId);
    },
    async sendOrder() {
      let sender = this.sendGood.sender[0];
      let code = this.sendGood.code;
      if (sender == "" || code == "") {
        this.$message.error("信息未填写完整!");
        return;
      }
      this.dialogFormVisible = false;
      if (sender != "" && code != "") {
        let data = {
          query: "sendOrder",
          data: {
            userId: Cookies.get("userId"),
            sessionId: Cookies.get("sessionId"),
            orderId: this.order.orderId + "",
            expressCode: code + "",
            express_company: sender
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
            sender: [],
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
            orderId: this.order.orderId + ""
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
