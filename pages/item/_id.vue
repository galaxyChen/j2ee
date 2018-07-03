<template>
    <div>
        <NavTop></NavTop>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="14">
                    <el-card shadow="never" body-style="{ padding: '20px'}" >
                        <el-container>
                            <el-aside><img class='item-img' :src='item.pictureAddress'/></el-aside>
                            <el-main><Detail :item='item'></Detail></el-main>                      
                        </el-container>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
        <el-row class='item-more' type="flex" justify="center">
            <el-col :xs="20" :sm="18" :md="18" :lg="18" :xl="14">
                <el-container>
                    <el-header>
                        <el-tabs v-model='activeTab' type='card' @tab-click="handleClick">
                            <el-tab-pane label="商品详情" name="detail"></el-tab-pane>
                            <el-tab-pane label="用户问答" name="question"></el-tab-pane>
                        </el-tabs>
                    </el-header>
                    <el-main>
                        <component :is='currentComponent' :item='item'></component>
                    </el-main>
                </el-container>
            </el-col>
        </el-row>

    </div>
</template>

<style scoped>
.item-more {
  position: relative;
  top: 60px;
}
.item-img {
  height: 360px;
  width: 270px;
  position: relative;
  left: 5px;
  border-style: solid;
  border-width: 2px;
  border-color: gainsboro;
}
.item-line {
  width: 100%;
  height: 0;
  border-width: 1px;
  border-style: dashed;
}
.item-price {
  color: red;
}
.item-detail {
  position: relative;
}
.item-row {
  margin-top: 50px;
}
.item-add {
  margin-top: 30px;
}
.blank-leaving {
  margin-top: 5px;
}
</style>

<script>
import NavTop from "~/components/NavTop";
import Detail from "~/components/item/Detail";
import Describe from "~/components/item/Describe";
import Question from "~/components/item/Question";
export default {
  async mounted() {
    console.log(this.$route.params.id);
    let data = {
      query: "getItemDetail",
      data: {
        itemId: this.$route.params.id
      }
    };
    let response = await this.$axios.send(data);
    if (response.status == 1) {
      this.item = response.data.product;
    } else {
      this.$message.error("发生错误：" + response.err);
    }
  },
  components: {
    NavTop,
    Detail,
    Describe,
    Question
  },
  data() {
    return {
      number: 1,
      activeTab: "detail",
      currentComponent: "Describe",
      item: {}
    };
  },
  methods: {
    handleClick(tab) {
      let com = {
        detail: "Describe",
        question: "Question"
      };
      this.activeTab = tab.name;
      this.currentComponent = com[tab.name];
    }
  }
};
</script>
