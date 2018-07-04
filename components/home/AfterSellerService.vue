<template>
    <!-- 卖家角度 查看所有申请售后的商品列表 -->
    <el-container v-if="showList">
        <el-main>
            <el-tabs v-model="service" >
                <el-tab-pane name="seeList" label="查看售后申请列表">
                    <el-card v-for="(item,index) in afterSellerServiceList" :key="index">
                        <div class="oneRequestMsg">
                            <el-row class="header">
                                <el-col class="header-text" :span="4">下单时间:{{item.purchaseTime}}</el-col>
                                <el-col class="header-text" :span="4"> 订单编号:{{item.orderId}} </el-col>
                            </el-row>
                            <el-row class="el-row-body">
                                <el-col :span="3" class="el-row-body-text"><img :src="item.pictureAddress"/> </el-col>
                                <el-col :span="3" class="el-row-body-text">{{item.itemTitle}}</el-col>
                                <el-col :span="3" class="el-row-body-text">
                                    <el-row style="margin-bottom:20px">服务单号:{{item.afterServiceId}}</el-row>
                                    <el-row>申请时间:{{item.launchTime}}</el-row>
                                </el-col>   
                                <!-- 按钮合集 -->
                                <el-col :span="3" class="el-row-body-text">{{item.afterServiceState}}</el-col>
                                <el-col :span="3" >
                                        <el-button size="small" v-if="item.afterServiceState=='等待审核'" @click="applyReview(index)" class="buttons">审核</el-button>

                                        <el-button size="small" v-if="item.afterServiceState=='等待售后收货'" @click="checkReceive(index)" class="buttons">售后收货</el-button>

                                        <el-button size="small" v-if="item.afterServiceState=='卖家已签收'" @click="completeAfterService(index)" class="buttons">完成售后</el-button>

                                        <el-button size="small" v-if="item.afterServiceState=='卖家已签收'" @click="requestService(index) " class="buttons">申请介入</el-button>

                                        <el-button type="text" size="small" class="buttons-text" @click="seeDetail(index)">查看详情</el-button>
                                </el-col>
                                <el-col :span="4" class="el-row-body-text">
                                    <el-row style="margin-bottom:20px">买家申诉信息</el-row>
                                    <el-row>卖家申诉信息</el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>

            <!-- 填写审核相关信息 -->
            <el-dialog title="售后审核" :visible.sync="reviewFormVisible">
                <el-row>
                    <el-col :span="10">服务单号：</el-col>
                    <el-col :span="8">申请时间：</el-col>
                </el-row>
                <div class="serviceMsg-box" style="margin-top:15px;">
                    <h3 class="text-title">服务单信息：</h3>
                    <div>
                        <el-row class="msg"> 
                            <el-col :span="5" class="col-title">服务单号</el-col>
                            <!-- 下方传入 服务单号 -->
                            <el-col :span="14" class="col-text">1</el-col>      
                        </el-row>
                        <el-row class="msg"> 
                            <el-col :span="5" class="col-title">申请时间</el-col>
                            <!-- 下方传入 申请时间 -->
                            <el-col :span="14" class="col-text">1</el-col>      
                        </el-row>
                        <el-row class="msg"> 
                            <el-col :span="5" class="col-title">退货原因</el-col>
                            <!-- 下方传入 退货原因 -->
                            <el-col :span="14" class="col-text">1</el-col>      
                        </el-row>
                        <el-row class="msg">
                            <el-col :span="5" class="col-title">退款金额</el-col>
                            <!-- 下方传入 退款金额 -->
                            <el-col :span="14" class="col-text">￥ </el-col>     
                        </el-row>
                        <el-row class="msg">
                            <el-col :span="5" class="col-title">联系人</el-col> 
                            <!-- 下方传入 联系人 -->
                            <el-col :span="14" class="col-text">1</el-col>     
                        </el-row>
                        <el-row class="msg">
                            <el-col :span="5" class="col-title">联系电话</el-col>
                            <!-- 下方传入 联系电话 -->
                            <el-col :span="14" class="col-text">1</el-col>     
                        </el-row>
                        <el-row class="msg">
                            <el-col :span="5" class="col-title">售后服务状态</el-col>
                            <!-- 下方传入 售后服务状态 -->
                            <el-col :span="14" class="col-text">1</el-col>     
                        </el-row>
                    </div>
                </div>

                <el-form :model="reviewGood">
                    <!-- 卖家角度 审核内容 -->
                    <el-form-item>
                        <el-switch v-model="reviewGood.flag" active-text="审核通过" inactive-text="审核不通过"></el-switch>
                    </el-form-item>
            
                    <el-form-item label="审核留言">
                        <el-input v-model="reviewGood.message" placeholder="请输入审核留言"></el-input>
                    </el-form-item>

                    <div v-if="reviewGood.flag">
                        <el-form-item label="联系人">
                            <el-input v-model="reviewGood.sellerName" ></el-input>
                        </el-form-item>
                        <mapLinkage ref="map" :province="reviewGood.province" :city="reviewGood.city"  @updateArea="updateArea"></mapLinkage>
                        <el-form-item label="详细地址">
                            <el-input v-model="reviewGood.addressDetail" ></el-input>
                        </el-form-item>
                    </div>

                    <!-- 确认提交审核信息  -->
                    <el-button type="primary" style="margin-left:85%;margin-top:20px;">确认</el-button>
                </el-form>
            </el-dialog>

        </el-main>
    </el-container>

     <el-container v-else>
        <el-header>
            <el-button @click="goBack" class="back-button" size="medium" type='text' icon="el-icon-back">返回</el-button>
        </el-header>
        <AfterSellerDetail></AfterSellerDetail>
    </el-container>
</template>

<style scoped>
.buttons {
  margin-top: 10px;
  margin-left: 20px;
}
.buttons-text {
  margin-top: 10px;
  margin-left: 30px;
  font-size: 14px;
}
.back-button {
  color: #999;
  font-size: 30px;
  margin-top: 16px;
}
.button-text {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: -20px;
  font-size: 14px;
  display: block;
  text-decoration: none;
}
.col-title {
  text-align: center;
  background-color: rgb(249, 249, 249);
  border-style: solid;
  border-width: 1px;
  border-color: rgb(228, 228, 228);
  font-size: 18px;
}
.col-text {
  text-align: left;
  left: 80px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(228, 228, 228);
  padding-left: 20px;
  font-size: 18px;
}
.header {
  background-color: rgb(249, 249, 249);
  /* height: 40px; */
}
.header-text {
  line-height: 30px;
  margin: 5px 0 5px 10px;
}
.el-row-body {
  margin-top: 15px;
}
.el-row-body-text {
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
}
.msg {
  margin-bottom: 3px;
  margin-top: 8px;
  padding: 1px;
}
</style>

<script>
import AfterSellerDetail from "~/components/home/AfterSellerDetail";
import mapLinkage from "~/components/home/mapLinkage";
import Cookies from "js-cookie";
export default {
  components: {
    AfterSellerDetail,
    mapLinkage
  },

  data() {
    return {
      reviewFormVisible: false,
      showList: true,
      service: "seeList",
      reviewGood: {
        flag: false,
        message: "",
        province: "",
        city: "",
        addressDetail: "",
        sellerName: ""
      },
      afterSellerServiceList: [
        {
          afterServiceId: 123,
          launchTime: "2018-6-28",
          returnReason: "图书图片不符",
          totalPrice: "20.5",
          description: "买的时候网上看的图书封面是蓝色，买下来发现是红色",
          buyerName: "lwz",
          phoneNumber: "13631433767",
          purchaseTime: "2018-6-27",
          orderId: "312",
          pictureAddress: "2",
          afterServiceState: "等待审核",
          itemTitle: "10001个为什么"
        },
        {
          afterServiceId: 163,
          launchTime: "2018-6-28",
          returnReason: "图书价格不符",
          totalPrice: "20.5",
          description: "买的时候说要10块，结果收我20块",
          buyerName: "lwz",
          phoneNumber: "13631433767",
          purchaseTime: "2018-6-27",
          orderId: "356",
          pictureAddress: "1",
          afterServiceState: "卖家已签收",
          itemTitle: "10001个为什么"
        },
        {
          afterServiceId: 163,
          launchTime: "2018-6-28",
          returnReason: "图书价格不符",
          totalPrice: "20.5",
          description: "买的时候说要10块，结果收我20块",
          buyerName: "lwz",
          phoneNumber: "13631433767",
          purchaseTime: "2018-6-27",
          orderId: "356",
          pictureAddress: "1",
          afterServiceState: "等待售后收货",
          itemTitle: "10001个为什么"
        }
      ]
    };
  },
  methods: {
    seeDetail(index) {
      console.log();
      console.log(afterSellerServiceList);
      this.afterSellerService = this.afterSellerServiceList[index];
      this.showList = false;
    },
    applyReview(index) {
      this.reviewFormVisible = true;
    },
    updateArea(province, city) {},
    checkReceive(index) {
      this.$confirm("请问是否确认收货？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = {
            query: "afterSalesReceipt",
            data: {
              userId: Cookkes.get("userId"),
              sessionId: Cookies.get("sessionId"),
              afterServiceId: this.afterSellerServiceList[index].afterServiceId
            }
          };

          let response = await this.$axios.send(data);
          if (response.status == 1) {
            await this.getSellerAfterServiceList();
            this.$message({ message: "发布成功！", type: "success" });
          } else if (response.status == 0) {
            this.$message.error("发送错误:" + response.err);
          } else {
            Cookies.remove("userId");
            Cookies.remove("sessionId");
            Cookies.remove("userName");
            this.$router.push({ path: "/" });
          }
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消收货" });
        });
    },
    requestService(index) {
      console.log("request");
      console.log(index);

      this.$router.push({
        path: "/Appeal",
        query: {
          id: this.afterSellerServiceList[index].afterServiceId,
          type: 1
        }
      });
    },
    completeAfterService(index) {
      this.$confirm("是否确认完成售后？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = {
            query: "finishReturn",
            data: {
              userId: Cookkes.get("userId"),
              sessionId: Cookies.get("sessionId"),
              afterServiceId: this.afterSellerServiceList[index].afterServiceId
            }
          };

          let response = await this.$axios.send(data);
          if (response.status == 1) {
            await this.getSellerAfterServiceList();
            this.$message({ message: "发布成功！", type: "success" });
          } else if (response.status == 0) {
            this.$message.error("发送错误:" + response.err);
          } else {
            Cookies.remove("userId");
            Cookies.remove("sessionId");
            Cookies.remove("userName");
            this.$router.push({ path: "/" });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消确认售后完成。"
          });
        });
    },
    goBack() {
      this.showList = true;
    },
    async getSellerAfterServiceList() {
      let data = {
        query: "getSellerAfterServiceList",
        data: {
          userId: Cookkes.get("userId"),
          sessionId: Cookies.get("sessionId")
        }
      };

      let response = await this.$axios.send(data);
      if (response.status == 1) {
        this.afterSellerServiceList = response.data.afterSellerServiceList;
      } else if (response.status == 0) {
        this.$message.error("发送错误:" + response.err);
      } else {
        Cookies.remove("userId");
        Cookies.remove("sessionId");
        Cookies.remove("userName");
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>
