<template>
    <el-row>
        <el-row>
            <div class="header">
                <el-col class="header-text" :span='10'>发布时间：{{item.launchDate}}</el-col>
                <el-col class="header-text" :span='10'>商品编号:{{item.itemId}}</el-col>
            </div>
        </el-row>
        <el-row>
            <el-col class='order-box' :span='4'>
                <div >
                    <img class='order-book' :src='item.pictureAddress'/>
                </div>
            </el-col>
            <el-col class='order-box' :span="8">
                <h4 class="order-title-text">{{item.itemTitle}}</h4>
                <a class="order-title-text">数量：{{item.quantity}}</a>
            </el-col>
            <el-col class='order-box' :span="4">
                <h4 class="order-title-text order-title-text-middle">{{item.itemState}}</h4>
            </el-col>
            <el-col class='order-box' :span="4">
                <h4 class="order-title-text">￥{{item.price}}</h4>
                <a class="order-title-text">是否包邮:{{item.freePostage?'是':'否'}}</a>
            </el-col>
            <el-col style="text-align:center;" class='order-box' :span="4">
                <el-button v-if='detail' @click="lookDetail" type="text"  class="order-button-text">查看详情</el-button>
                <el-button @click="changeItem" v-if='change' type="text"  class="order-button-text">修改商品信息</el-button>
                <el-button size='small' @click="cancelItem" v-if='cancel' type="danger"  class="order-button">下架</el-button>
            </el-col>
        </el-row>
    </el-row>
</template>


<style scoped>
.header {
  background-color: rgb(249, 249, 249);
  height: 40px;
}
.header-text {
  line-height: 30px;
  margin: 5px 0 5px 10px;
}
.order-book {
  width: 90px;
  height: 120px;
  margin: 10px;
}

.order-box {
  border-width: 2px 2px 2px 0;
  border-style: solid;
  border-color: rgb(249, 249, 249);
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.order-box:first-child {
  border-left-width: 2px;
}
.order-title-text {
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.order-title-text-middle {
  margin-top: 40px;
}
.order-button {
  margin-top: 20px;
  width: 50%;
}
.order-button-text {
  margin-top: 10px;
  margin-bottom: -20px;
  font-size: 14px;
  color: rgb(108, 105, 107);
  text-align: center;
}
.order-button-text:hover {
  text-decoration: underline;
}
</style>

<script>
import Cookies from "js-cookie";
export default {
  props: ["item"],
  computed: {
    change() {
      if (this.item.itemState == '交易中') return false;
      return true;
    },
    cancel() {
      if (this.item.itemState == '已下架' || this.item.itemState == '已完成') return false;
      return true;
    },
    detail() {
      return true;
    }
  },
  methods: {
    lookDetail() {
      this.$router.push({ path: `/item/${this.item.itemId}` });
    },
    changeItem() {
      this.$emit("changeItem", this.item.itemId);
    },
    cancelItem() {
      this.$confirm("确认下架吗?", "下架确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "danger"
      }).then(async () => {
        let data = {
          query: "deleteItem",
          data: {
            userId: Cookies.get("userId"),
            sessionId: Cookies.get("sessionId"),
            itemId: this.item.itemId+""
          }
        };
        let response = await this.$axios.send(data);
        if (response.status == 1) {
            this.$message({
                message:"下架成功！",
                type:"success"
            })
            this.$emit('deleteItem',this.item.itemId)
        } else if (response.status == 0) {
          this.$message.error("发生错误：" + response.err);
        } else {
          this.$message.error("登录超时！");
          Cookies.remove("userId");
          Cookies.remove("sessionId");
          Cookies.remove("userName");
          this.$router.push({ path: "/" });
        }
      });
    }
  }
};
</script>
