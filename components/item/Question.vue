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
            <QuestionItem v-for='q in showQuestions' :key='q.id' :question='q' 
            :is_seller='is_seller'  @sendAnswer="getQA"></QuestionItem>
        </el-row>
        <el-row style="margin-top:40px;" type="flex" justify="center">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="5"
                layout="total, prev, pager, next"
                :total="questions.length">
              </el-pagination>
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
import Cookies from "js-cookie";
export default {
  mounted() {
    this.getQA();
    this.is_seller = Cookies.get("userId") == this.item.sellerId;
  },
  components: {
    QuestionItem
  },
  props: ["item"],
  data() {
    return {
      currentPage: 1,
      nowUserId: "",
      is_seller: false,
      questions: [],
      showQuestions: [],
      ask: "",
    };
  },
  methods: {
    handleCurrentChange(page) {
      let begin = 5 * (page - 1);
      this.showQuestions = JSON.parse(JSON.stringify(this.questions)).splice(begin,5);
    },
    async sendAsk() {
 
      if(this.ask.length>200){
        this.$message.error("留言不可以超过200字");
        return;
      }
      else if(this.ask.length==0){
        this.$message.error("留言不可以为空");
        return;
      }
      let userId = Cookies.get("userId");
      let sessionId = Cookies.get("sessionId");
      let data = {
        query: "sendAsk",
        data: {
          userId: userId,
          sessionId: sessionId,
          itemId: this.item.itemId + "",
          questionContent: this.ask
        }
      };
      
      let response = await this.$axios.send(data);
      if (response.status === 1) {
        
        this.ask = "" ;

        this.questions = response.data.QAList;
        this.showQuestions = JSON.parse(JSON.stringify(this.questions)).splice(0,5);
        this.currentPage = 1;
        this.$message("提问成功");
      } else if (response.status == -1) {
        this.$message.error("登录超时！");
        Cookies.remove("userId");
        Cookies.remove("sessionId");
        Cookies.remove("userName");
        this.$router.push({ path: "/" });
      } else {
        this.$message.error("发生错误：" + response.err);
      }
    },
    async getQA() {
      let userId = Cookies.get("userId");
      let sessionId = Cookies.get("sessionId");
      let data = {
        query: "getQA",
        data: {
          itemId: this.item.itemId + ""
        }
      };
      let response = await this.$axios.send(data);
      if (response.status === 1) {
        this.questions = response.data.QAList;
        this.showQuestions = JSON.parse(JSON.stringify(this.questions)).splice(0,5);
        // this.currentPage = 1;
      } else {
        this.$message.error("发生错误：" + response.err);
      }
    }
  }
};
</script>
