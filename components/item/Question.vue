<template>
    <div class="item-question">
        <el-row v-if="!is_seller">
            <el-col :span='16'>
                <el-input  type="textarea"  :rows="2" placeholder="请输入内容" v-model="ask">
                </el-input>
            </el-col>
            <el-col :span='4'>
                <el-button class="item-ask-button" type="success" @click="sendAsk">提交提问</el-button>
            </el-col>
        </el-row>
          
        <el-row class="item-question-area">
            <QuestionItem v-for='q in questions' :key='q.id' :question='q' :is_seller='is_seller'  @sendAnswer="getQA"></QuestionItem>
        </el-row>
    </div>
</template>

<style scoped>
.item-question {
  min-height: 400px;
  margin-bottom: 120px;
}
.item-ask-button {
  margin-top: 10px;
  margin-left: 30px;
}
.item-question-area {
  position: relative;
  top: 30px;
}
</style>


<script>
import QuestionItem from "~/components/item/QuestionItem";
import Cookies from 'js-cookie'
export default {
  mounted(){
    this.getQA();
    this.is_seller = Cookies.get("userId")==this.item.sellerId
  },
  components: {
    QuestionItem
  },
  props: ["item"],
  data() {
    return {
      errorVisible:false,
      is_seller: false,
      questions: [
        {
          questionContent : '',
          responseContent : '',
          askerId : '',
          sellerId : '',
          askerName : '',
          sellerName : '',
          askTime : '',
          answerTime : '',
          questionId : ''
        },
      ],
      ask : '',
    };
  },
  methods : { 
    async sendAsk(){
        // 检验是不是200字内
        if(this.ask.length>200){
          this.$message.error("留言不可超过200字")
          return 
        }

        let userId = Cookies.get("userId")
        let sessionId = Cookies.get("sessionId")
        let data = {
          query : "sendAsk",
          data : {
            userId : userId ,
            sessionId : sessionId , 
            itemId : this.item.itemId+"",
            questionContent : this.ask
          }
        }
        let response = await this.$axios.send(data)
        if(response.status===1){
            this.$message.success("提问成功")
            this.ask = ''
            this.questions = response.data.QAList;
        }
        else if (response.status == -1) {
          this.$message.error("登录超时！");
          Cookies.remove("userId");
          Cookies.remove("sessionId");
          Cookies.remove("userName");
          this.$router.push({ path: "/" });
        } else {
          this.$message.error("发生错误：" + response.err);
        }
    },
    async getQA(){
        let userId = Cookies.get("userId")
        let sessionId = Cookies.get("sessionId")
        let data = {
          query : "getQA",
          data : {
            itemId : this.item.itemId+"",
          }
        }
        let response = await this.$axios.send(data)
        if(response.status===1){
            this.questions = response.data.QAList;
        }
        else {
          this.$message.error("发生错误：" + response.err);
        }
    }
  }
};
</script>
