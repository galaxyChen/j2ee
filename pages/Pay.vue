<template>
    <el-container>
        <el-header>
            <NavTop></NavTop>
        </el-header>

        <el-main class="main-box">
            <p style="color:#CCCCCC;margin-left:80px;">支付订单</p>
            <div class="payTips">
                <el-row > 
                    <el-col :span="18">
                         <i class="el-icon-success" style="color:green;font-size:50px;float:left;"></i>
                         <el-row style="margin-left:60px;font-size:20px;">
                        订单提交成功！请尽快完成支付！</el-row>
                        <el-row style="margin-left:60px;color:#CCCCCCC">请在 {{time_limit}} 内完成支付，超时后将取消订单</el-row>
                    </el-col>

                    <el-col :span="6">
                        <el-row style="margin-left:60px;">应付总额: ￥ {{price}}</el-row>
                    </el-col>
                </el-row>
               
            </div>

            <div class="payApproach">
                <p style="color:#CCCCCC;margin-left:80px;font-size:20px">选择以下方式付款</p>
                <hr style="margin:30px 20px 20px 75px;">
                <div style="margin-left:80px;">
                    <p style="font-size:30px">支付平台</p>
                    <el-radio-group v-model="payRadio" style="padding-top:30px;">
                        <el-radio :label="1">微信支付</el-radio>
                        <el-radio :label="2">支付宝</el-radio>
                        <el-radio :label="3">ApplePay</el-radio>
                    </el-radio-group>

                     <el-button type="primary" class="confirmBtn" @click="PayConfirm">支付</el-button>
                     <el-button @click="cancelPay">取消</el-button>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import NavTop from "~/components/NavTop";
import Cookies from "js-cookie";
export default {
  components: {
    NavTop
  },
  mounted() {
    let params = this.$route.params;
    console.log(params)
    this.price = params.totalPay;
    this.time_limit = params.time_limit;
  },
  data() {
    return {
      payRadio: 1,
      time_limit: "",
      price: ""
    };
  },

  // 获取 剩余支付时间
  computed: {
    getTime_limit() {
      if (this.time_limit) {
        let time = this.time_limit.split(":");
        let t = "";
        if (time.length === 3)
          t = time[0] + "时" + time[1] + "分" + time[2] + "秒";
        else if (time.length === 2) t = time[0] + "分" + time[1] + "秒";
        return t;
      }
    }
  },

  methods: {
    cancelPay(){

    },
    PayConfirm() {
      let orderId = this.$route.params.orderId
      if(orderId==undefined){
        this.$message('非法操作')
        return
      }

      this.$confirm("确认支付吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let userId = Cookies.get("userId");
        let sessionId = Cookies.get("sessionId");
        let data = {
          query: "payForOrder",
          data: {
            userId: userId,
            sessionId: sessionId,
            orderId: orderId+""
          }
        };
        let response = await this.$axios.send(data);

        if (response.status == 1) {
          
          this.$message({
            type: "success",
            message: "支付成功!"
          });
          
          this.$router.push({ path: `/home/${userId}`, query: { index: "1",time:new Date() } });
        } else if (response.status == -1) {
          this.$message.error("登录超时！");
          Cookies.remove("userId");
          Cookies.remove("sessionId");
          Cookies.remove("userName");
          this.$router.push({ path: "/" });
        } else {
          this.$message.error("发生错误：" + response.err);
        }
      });
    }
  }
};
</script>

<style>
body {
  background-color: rgb(237, 242, 248);
}
.main-box {
  margin-top: 15px;
}
.payTips {
  background-color: white;
  margin: 30px 4%;
  padding: 20px 7%;
}
.payApproach {
  margin: 30px 4%;
  padding: 40px 1%;

  background-color: white;
}
.confirmBtn {
  margin-left: 90%;
}
</style>
