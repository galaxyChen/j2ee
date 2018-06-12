<template>
    <div class="item-question-item">
        <el-row>
            <el-col :span="16">用户<h4 class='item-user'>{{question.asker}}</h4>:{{question.question}}</el-col>
            <el-col class="item-time" :span="4" :push='4'>{{question.time}}</el-col>
        </el-row>
        <el-row class="item-answer" v-if='hasAnswer'>店家回复:{{question.answer}}</el-row>
        <el-row class="item-answer-iput" v-if='showResponse'>
            <el-col :span='16'>
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入回复"
                    >
                </el-input>
            </el-col>
            <el-col :span='8'>
                <el-button class="item-ask-button" type="success">提交回复</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style>
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
export default {
  props: ["question", "is_seller"],
  data() {
    return {};
  },
  computed: {
    hasAnswer() {
      return !this.question.answer == "";
    },
    showResponse() {
      return !this.hasAnswer && this.is_seller;
    }
  }
};
</script>
