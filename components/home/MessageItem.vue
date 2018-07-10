<template>
    <div class="message">
        <el-row>
            <el-col :span='1' class="read-icon"><i :class='message.unread==1?"el-icon-message":"el-icon-check"'></i></el-col>
            <el-col :span="8">
                <h4 class="title" @click="handleClick" v-if="message.unread">{{title}}</h4>
                <div class="title" @click="handleClick" v-else>{{title}}</div>
            </el-col>
            <el-col :span='4'>
              <a style="color:#999;">{{message.launchTime}}</a>
            </el-col>
            <el-col :span='10'>
                <el-button size='small' type='text' @click="lookItemDetail" v-if="itemDetail">查看商品详情</el-button>
                <el-button size='small' type='text' @click="replyMessage" v-if="reply">回复</el-button>
                <el-button size='small' type='text' @click="lookOrderDetail" v-if="orderDetail">查看订单详情</el-button>
                <el-button size='small' type='text' @click="lookServiceDetail" v-if="service">查看售后服务详情</el-button>
                <!-- <el-button size='small' type='text' @click="lookDealDetail" v-if="deal">查看申诉处理结果</el-button> -->
                <el-button size='small' type="text" @click="show = !show"><i class="el-icon-sort"></i></el-button>
            </el-col>
        </el-row>
        <el-collapse-transition>
            <div v-html="content" style="margin-left:50px;" v-if="show"></div>
        </el-collapse-transition>
        <div class="line"></div>

        <el-dialog title="回复留言" :visible.sync="dialogFormVisible">
            <div style='font-size:16px;margin-bottom:10px;'>用户提问：{{message.question}}</div>
            <el-input v-model="answer"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmReply">确 定</el-button>
          </div>
        </el-dialog>
        
    </div>
</template>

<style scoped>
.read-icon {
  font-size: 18px;
}
.message {
  line-height: 32px;
  position: relative;
}
.line {
  border-bottom: 1px solid #999;
  height: 0;
  width: 100%;
}
.title:hover {
  cursor: pointer;
}
</style>

<script>
import Cookies from "js-cookie";
export default {
  mounted() {
    // console.log(this.message);
  },
  data() {
    return {
      show: false,
      dialogFormVisible: false,
      answer: "",
    };
  },
  props: ["message"],
  methods: {
    lookItemDetail() {
      this.readMessage();
      let item_id = this.message.itemId;
      this.$router.push({ path: `/item/${item_id}` });
    },
    replyMessage() {
      if (!this.show) this.show = true;
      this.readMessage();
      this.dialogFormVisible = true;
      
    },
    async confirmReply() {
      if(this.answer.length>200){
          this.$message.error("留言不可超过200字")
          return 
      }
      else if(this.answer==0){
          this.$message.error("回复不可为空")
          return 
      }
      let query = {
        query: "sendAnswer",
        data: {
          userId: Cookies.get("userId"),
          sessionId: Cookies.get("sessionId"),
          questionId: this.message.questionId+"",
          answerContent: this.answer
        }
      };
      let response = await this.$axios.send(query);
      if (response.status == 1) {
        this.$message({
            message:'回复成功！',
            type:'success'
        })
        this.dialogFormVisible = false;
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
    lookOrderDetail() {
      this.readMessage();
      let type = 1;
      if (this.message.messageType < 4) type = 1;
      else type = 2;
      this.$emit("lookOrder", this.message.orderId, type);
    },
    lookServiceDetail() {
      this.readMessage();
      this.$emit('lookServiceDetail',this.message.afterServiceId)
    },
    lookDealDetail() {
      this.readMessage();
      this.$emit('lookDealDetail',this.message.afterServiceId)
    },
    readMessage() {
      if (this.message.unread == 1) this.$emit("read", this.message.messageId);
    },
    handleClick() {
      this.show = !this.show;
      this.readMessage();
    }
  },
  computed: {
    title() {
      if (this.message.messageType == "1.1") return "您的留言有新的回复";

      if (this.message.messageType == "2.1")
        return "您的商品收到了一条新的留言";

      if (this.message.messageType == "3.1") return "您有一个未支付的订单";
      if (this.message.messageType == "3.2") return "您有一个订单已发货";
      if (this.message.messageType == "3.3")
        return "您的订单逾期未付款，已过期";
      if (this.message.messageType == "3.4")
        return "您有一个订单逾期未发货自动取消";

      if (this.message.messageType == "4.1") return "新的出售订单";
      if (this.message.messageType == "4.2") return "新的待发货的订单";
      if (this.message.messageType == "4.3") return "逾期未发货的订单已取消";
      if (this.message.messageType == "4.4") return "商品已被签收";
      if (this.message.messageType == "4.5") return "订单已完成";
      if (this.message.messageType == "4.6") return "订单被取消啦";
      if (this.message.messageType == "4.7")
        return "逾期未付款的订单已自动取消";

      if (this.message.messageType == "5.1") return "卖家通过了您的退货申请";
      if (this.message.messageType == "5.2")
        return "逾期未退货，售后服务已自动关闭";
      if (this.message.messageType == "5.3") return "卖家收到您的退货啦";
      if (this.message.messageType == "5.4")
        return "售后已经完成啦，请注意查收货款";
      if (this.message.messageType == "5.5")
        return "抱歉，您的退货申请被拒绝了";
      if (this.message.messageType == "5.6") return "您的售后申请已自动关闭";
      if (this.message.messageType == "5.7") return "平台通过了您的申诉";
      if (this.message.messageType == "5.8") return "平台拒绝了您的申诉";
      if (this.message.messageType == "5.9") return "卖家已申请平台介入";
      if (this.message.messageType == "5.10") return "平台通过了卖家的申诉";
      if (this.message.messageType == "5.11") return "平台拒绝了卖家的申诉";

      if (this.message.messageType == "6.1") return "您有一个待处理的退货申请";
      if (this.message.messageType == "6.2") return "买家已退货，请注意查收";
      if (this.message.messageType == "6.3") return "您有一个售后已自动签收";
      if (this.message.messageType == "6.4") return "您有一个售后已自动完成";
      if (this.message.messageType == "6.5") return "有买家发起了申诉";
      if (this.message.messageType == "6.6") return "平台通过了买家的申诉";
      if (this.message.messageType == "6.7") return "平台通过了买家的申诉";
      if (this.message.messageType == "6.8") return "平台通过了您的申诉";
      if (this.message.messageType == "6.9") return "平台通过了您的申诉";
      if (this.message.messageType == "6.10") return "买家取消了退货申请";
      if (this.message.messageType == "6.11")
        return "买家逾期未退货，售后申请已自动取消";
    },
    content() {
      if (this.message.messageType == "1.1") {
        let userName = this.message.userName;
        let title = this.message.title;
        let question = this.message.question;
        let answer = this.message.answer;
        return `<b>${userName}</b>回复了您对<b>${title}</b>的提问：${question} <br> 回复：${answer}`;
      }

      if (this.message.messageType == "2.1") {
        let userName = this.message.userName;
        let title = this.message.title;
        let question = this.message.question;
        return `<b>${userName}</b>对您的商品<b>${title}</b>发出提问：${question}`;
      }

      if (this.message.messageType == "3.1")
        return "您有一个订单还未付款，请尽快付款，超过2个小时未付款系统将自动取消该订单";
      if (this.message.messageType == "3.2")
        return "您有一个订单已发货，请注意查收";
      if (this.message.messageType == "3.3")
        return "您有一个订单逾期未付款，已自动取消该订单";
      if (this.message.messageType == "3.4")
        return "您有一个订单卖家逾期未发货，系统已自动取消该订单，货款将原路返回您的账户，请注意查收！";

      if (this.message.messageType == "4.1")
        return "您收到了一个新的出售订单，正在等待买家付款";
      if (this.message.messageType == "4.2")
        return "您的一个出售订单已经付款， 请在7天内发货并填写物流信息";
      if (this.message.messageType == "4.3")
        return "您的一个出售订单未能及时发货，已自动取消该订单";
      if (this.message.messageType == "4.4") return "您的一个出售订单已被签收";
      if (this.message.messageType == "4.5")
        return "您的一个出售订单已完成，货款将支付到您的账户中， 请注意查收！";
      if (this.message.messageType == "4.6")
        return "您的一个出售订单被取消啦！";
      if (this.message.messageType == "4.7")
        return "您的一个出售订单超时未支付，已自动取消。";

      if (this.message.messageType == "5.1")
        return "您的一个退货申请已经通过请按照售后服务单中的退货地址进行退货并填写退货物流，如果超过7天未填写退货物流信息，售后将自动关闭";
      if (this.message.messageType == "5.2")
        return "您的售后申请逾期未退货，已自动关闭";
      if (this.message.messageType == "5.3")
        return "卖家您的退货，请耐心等待卖家审查商品";
      if (this.message.messageType == "5.4")
        return "您的退货已被确认收货，退款已原路退回到您的账户，请注意查收";
      if (this.message.messageType == "5.5")
        return "抱歉，您有一个退货申请被拒绝了，如果有需要可以申请平台介入。";
      if (this.message.messageType == "5.6")
        return "您有一个售后服务已自动关闭";
      if (this.message.messageType == "5.7")
        return "您有一个申述已通过，请在按照售后服务单中的退货地址进行退货并及时填写物流信息，如果超过7天未填写物流信息，售后将自动关闭。";
      if (this.message.messageType == "5.8")
        return "抱歉，您有一个的申述被拒绝了， 请点击查看按钮，查看处理详情";
      if (this.message.messageType == "5.9")
        return "卖家对您的退货有疑惑，已申请平台介入";
      if (this.message.messageType == "5.10")
        return "卖家的申述已通过，您的售后服务已关闭，货款已支付给卖家，可在申诉结果页面查看详细的处理方案";
      if (this.message.messageType == "5.11")
        return "卖家的申述已被拒绝，您已成功退货，货款将原路放回您的账户，请注意查收";

      if (this.message.messageType == "6.1")
        return "有买家发起了退货申请，请在7天内进行处理，逾期未处理将自动通过";
      if (this.message.messageType == "6.2")
        return "有买家的退货已经发出，请注意查收。如果超过14天未签收，系统将自动签收";
      if (this.message.messageType == "6.3")
        return "有买家的退货超过14天未签收，系统已自动签收";
      if (this.message.messageType == "6.4")
        return "有买家的退货超过7天未进行确认，系统已自动确认，货款已退还给买家";
      if (this.message.messageType == "6.5")
        return "有买家发起了平台介入啦，点击按钮，查看申诉详情";
      if (this.message.messageType == "6.6")
        return "买家的申述已通过，买家将按照默认退货地址进行退货，请注意查收";
      if (this.message.messageType == "6.7")
        return "买家的申述已被拒绝，该售后服务已取消，货款将支付到您的账户，请注意查收";
      if (this.message.messageType == "6.8")
        return "您的申述已通过，该售后服务已取消，货款将支付到您的账户，请注意查收。";
      if (this.message.messageType == "6.9")
        return "抱歉，您的申述被拒绝了， 该售后服务已完成，货款将退还给买家";
      if (this.message.messageType == "6.10") return "买家的售后申请已取消";
      if (this.message.messageType == "6.11")
        return "买家的售后申请逾期未发货，已自动取消";
    },
    itemDetail() {
      if (
        this.message.messageType == "1.1" ||
        this.message.messageType == "2.1"
      )
        return true;
      else return false;
    },
    reply() {
      if (this.message.messageType == "2.1") return true;
      else return false;
    },
    orderDetail() {
      let type = this.message.messageType + "";
      type = type.split(".");

      if (type[0] == "3" || type[0] == "4") return true;
      else return false;
    },
    service() {
      let type = this.message.messageType + "";
      type = type.split(".");

      if (type[0] == "5" || type[0] == "6") return true;
      else return false;
    },
    deal() {
      //6.5-6.9
      //5.7-5.11
      let type = this.message.messageType + "";
      type = type.split(".");

      type[0] = type[0] - 0;
      type[1] = type[1] - 0;
      if (type[0] == 6 && type[1] <= 8 && type[1] >= 5) return true;
      if (type[0] == 5 && type[1] <= 11 && type[1] >= 7) return true;
      return false;
    }
  }
};
</script>
