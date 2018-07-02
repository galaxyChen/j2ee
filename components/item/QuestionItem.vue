<template>
    <div class="item-question-item">
        <el-row>
            <el-col :span="16">用户<h4 class='item-user'>{{question.askerName}}</h4>:{{question.question}}</el-col>
            <el-col class="item-time" :span="4" :push='4'>{{question.askTime}}</el-col>
        </el-row>
        <el-row class="item-answer" v-if='hasAnswer'>店家回复:{{question.responseContent}}</el-row>
        <el-row class="item-answer-iput" v-if='showResponse'>
            <el-col :span='16'>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入回复"
                    v-model="answer"
                    >
                </el-input>
            </el-col>
            <el-col :span='8'>
                <el-button class="item-ask-button" type="success" @cllick="sendAnswer" >提交回复</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.item-question-item {
  border-width: 0;
  line-height: 30px;
  border-top-width: 1px;
  border-style: dashed;
  margin-top: 10px;
  font-size: 18px;
}
.item-answer {
  color: rgb(193, 135, 77);
}
.item-answer-input {
  margin-top: 10px;
}
.item-time{
    color: grey;
}
.item-user{
    display: inline;
}
</style>

<script>
import Cookies from "js-cookie";

export default {
  props: ["question", "is_seller"],
  data() {
    return {
        answer : '',
    };
  },
  methods:{
    async sendAnswer(){
        let userId = Cookies.get("userId")
        let sessionId = Cookies.get("sessionId")
        let data = {
            userId : userId ,
            sessionId : sessionId , 
            questionId : this.question.questionId,
            answerContent : this.answer
        }
        let response = await this.$axios.send(data)
        if(response.status===1){
            this.$message("回复成功")
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
    }
  },
  computed: {
    hasAnswer() {
      return !this.question.answer == "";
    },
    showResponse() {
      return !this.hasAnswer && this.is_seller;
    },

  }
};
</script>
