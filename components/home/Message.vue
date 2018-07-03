<template>
    <el-col style="margin-top:50px;" :span='15' :push="1">
        <el-container v-if="showList">
        <el-header>
        <el-tabs v-model="activeTab"  type="card" @tab-click="handleClick">
            <el-tab-pane label="全部信息" name="all"></el-tab-pane>
            <el-tab-pane label="商品信息" name="item"></el-tab-pane>
            <el-tab-pane label="订单信息" name="order"></el-tab-pane>
            <el-tab-pane label="售后信息" name="service"></el-tab-pane>
        </el-tabs>
        </el-header>
        <el-main>
            <MessageItem @lookOrder='lookOrder' @read='readMessage' v-for="(item,index) in onShowList" 
                :key='"message"+item.messageId'
                :message="item"
                :name='index'></MessageItem>           
        </el-main>
        <el-footer>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="totalSize">
              </el-pagination>
        </el-footer>
    </el-container>
    <el-container v-else>
            <el-header>
                <el-button @click="goBack" class="back-button" size="medium" type='text' icon="el-icon-back">返回</el-button>
            </el-header>
            <el-main>
                <OrderDetail :type='type' :order='onShowOrder'></OrderDetail>
            </el-main>
    </el-container>
    </el-col>
</template>

<style scoped>
</style>

<script>
import MessageItem from "~/components/home/MessageItem";
import OrderDetail from "~/components/home/OrderDetail";
import Cookies from "js-cookie";
export default {
  components: {
    MessageItem,
    OrderDetail
  },
  mounted() {
    this.getMessage();
  },
  data() {
    return {
      activeTab: "all",
      showList: true,
      type: 1,
      currentPage: 1,
      totalSize: 0,
      activeMessage: [1],
      onShowOrder: {},
      messageList: [],
      onShowList: []
    };
  },
  methods: {
    async lookOrder(orderId, type) {
      this.type = type;
      let query = {
        query: "getOneOrder",
        data: {
          userId: Cookies.get("userId"),
          sessionId: Cookies.get("sessionId"),
          orderId: orderId + ""
        }
      };
      let response = await this.$axios.send(query);
      if (response.status == 1) {
        this.onShowOrder = response.data.order;
        this.showList = false;
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
    goBack() {
      this.showList = true;
      this.updateShowList();
    },
    async readMessage(id) {
      console.log("read");
      let index = 0;
      while (this.messageList[index].messageId != id) index++;
      let temp = JSON.parse(JSON.stringify(this.messageList[index]));
      temp.unread = 0;
      this.messageList.splice(index, 1, temp);
      this.updateShowList();
      let query = {
        query: "readMessage",
        data: {
          userId: Cookies.get("userId"),
          sessionId: Cookies.get("sessionId"),
          messageId: [id]
        }
      };
      let response = await this.$axios.send(query);
    },
    handleClick(tab) {
      this.updateShowList();
    },
    updateShowList() {
      let showList = []
      if (this.activeTab == "all") showList = this.messageList;
      else if (this.activeTab == "item") {
        let show_list = this.messageList.filter((value, index) => {
          if (value.messageType < 3) return true;
          else return false;
        });
        showList = show_list;
      } else if (this.activeTab == "order") {
        let show_list = this.messageList.filter((value, index) => {
          if (value.messageType < 5 && value.messageType > 3) return true;
          else return false;
        });
        showList = show_list;
      } else if (this.activeTab == "service") {
        let show_list = this.messageList.filter((value, index) => {
          if (value.messageType > 5) return true;
          else return false;
        });
        showList = show_list;
      }

      this.totalSize = showList.length;
      this.currentPage = 1;
      this.totalShowList = showList;
      this.onShowList = JSON.parse(JSON.stringify(this.totalShowList)).splice(0, 10);
    },
    handleCurrentChange(page){
      console.log(page)
      let begin = 10*(page-1);
      this.onShowList = JSON.parse(JSON.stringify(this.totalShowList)).splice(begin,10);
    },
    async getMessage() {
      let query = {
        query: "getMessage",
        data: {
          userId: Cookies.get("userId"),
          sessionId: Cookies.get("sessionId")
        }
      };
      let response = await this.$axios.send(query);
      if (response.status == 1) {
        this.messageList = response.data.messageList.reverse();
        this.updateShowList();
      } else if (response.status == 0) {
        this.$message.error("发生错误" + response.err);
      } else {
        this.$message.error("登录超时！");
        Cookies.remove("userId");
        Cookies.remove("sessionId");
        Cookies.remove("userName");
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>
