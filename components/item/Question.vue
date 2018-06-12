<template>
    <div class="item-question">
        <el-row>
            <el-col :span='16'>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>
            </el-col>
            <el-col :span='8'>
                <el-button class="item-ask-button" type="success">提交提问</el-button>
            </el-col>
        </el-row>
        <el-row class="item-question-area">
            <QuestionItem v-for='q in questions' :key='q.id' :question='q' :is_seller='is_seller'></QuestionItem>
        </el-row>
    </div>
</template>

<style>
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
export default {
  components: {
    QuestionItem
  },
  props: ["item"],
  data() {
    return {
      is_seller: false,
      questions: [
        {
          id: 1,
          question: "有没有签名啊",
          time: "2018.4.1 16:59",
          asker: "李四",
          answer: "没有的"
        },
        {
          id: 2,
          question: "书有损坏吗",
          time: "2018.5.6 13:25",
          asker: "王五",
          answer: ""
        }
      ]
    };
  }
};
</script>
