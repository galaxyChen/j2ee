<template>
    <div class="item-question">
        <el-row>
            <el-col :span='16'>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ask">
                </el-input>
            </el-col>
            <el-col :span='8'>
                <el-button class="item-ask-button" type="success" @click="sendAsk">提交提问</el-button>
            </el-col>
        </el-row>
        <el-row class="item-question-area">
            <QuestionItem v-for='q in questions' :key='q.id' :question='q' :is_seller='nowUserId==q.sellerId'></QuestionItem>
        </el-row>
    </div>
</template>

<style scoped>
.item-question {
  min-height: 400px;
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
    this.nowUserId = Cookies.get("userId")
  },
  components: {
    QuestionItem
  },
  props: ["item"],
  data() {
    return {
      nowUserId : '',
      is_seller: false,
      questions: [
        {
          // id: 1,
          // question: "有没有签名啊",
          // time: "2018.4.1 16:59",
          // asker: "李四",
          // answer: "没有的"
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
            this.$message("提问成功")
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
            this.$message("提问成功")
            this.questions = response.data.QAList;
        }
        else {
          this.$message.error("发生错误：" + response.err);
        }
    }
  }
};
</script>
