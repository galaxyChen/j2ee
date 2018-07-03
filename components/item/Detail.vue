<template>
    <div class='item-detail'>
        <el-row class = 'item-row'>
            <h3>{{item.itemTitle}}</h3>
        </el-row>
        <el-row class="item-row">
            <h4 style="color:#999;">《{{item.bookName}}》</h4>
        </el-row>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <div>作者：{{item.author}}</div>
            </el-col>
            <el-col :span='8'>
                <div>出版社：{{item.press}}</div>
            </el-col>
            <el-col :span='8'>
                <div>出版日期：{{item.publicationDate}}</div>
            </el-col>
        </el-row>
        <div class='item-line'></div>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <div>发布者：{{item.sellerName}}</div>
            </el-col>
        </el-row>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <div>包邮：{{item.freePostage==1?'是':'否'}}</div>
            </el-col>
            <el-col :span='9'>
                <div>上架时间：{{item.launchDate}}</div>
            </el-col>
        </el-row>
        <div class='item-line'></div>
        <el-row class = 'item-row'>
            <el-col :span='12'>
                价格：<a class='item-price'>￥<b>{{item.price}}</b></a>
            </el-col>
        </el-row>
        <el-row style="margin-top:40px;" type="flex" justify="end">
            <el-col :span='8'>
                <el-input-number size='small' v-model="number" @change="handleChange" :min="1" :max="item.quantity" label="描述文字"></el-input-number>
                <a>&nbsp;&nbsp;库存：{{item.quantity}}</a>
            </el-col>
            <el-col :span="6">
                <el-button size='small' v-if="showAddButton" @click="addBook" class='item-add' round type='danger'>加入购物车</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.item-row {
  margin-bottom: 20px;
  margin-top: 10px;
}
.item-line {
  width: 100%;
  height: 0;
  border-width: 1px;
  border-style: dashed;
}
</style>


<script>
import Cookies from "js-cookie";
export default {
  mounted() {
    console.log(this.item);
  },
  props: ["item"],
  data() {
    return {
      number: 1
    };
  },
  methods: {
    handleChange(num) {
      this.number = num;
    },
    async addBook() {
      let userId = Cookies.get("userId");
      if (!userId) {
        this.$message("请先登录");
        return;
      }
      let data = {
        query: "addBookToCar",
        data: {
          userId: Cookies.get("userId"),
          sessionId: Cookies.get("sessionId"),
          itemId: this.item.itemId + "",
          quantity: this.number + "" //添加的物品的数量
        }
      };
      let response = await this.$axios.send(data);
      if (response.status == 1) {
        this.$message({
          type: "success",
          message: "添加成功！"
        });
      } else if (response.status == 0) {
        this.$message.error("发生错误：" + response.err);
      } else {
        this.$message.error("登录超时！");
        Cookies.remove("userId");
        Cookies.remove("sessionId");
        Cookies.remove("userName");
        this.$router.push({ path: "/" });
      }
    }
  },
  computed: {
    showAddButton() {
      return this.item.sellerId != Cookies.get("userId");
    }
  }
};
</script>
