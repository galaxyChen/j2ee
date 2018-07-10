<template>
    <!-- 卖家角度 查看所有申请售后的商品列表 -->
    <el-container v-if="showList">
        <el-main>
            <el-tabs v-model="service" >
                <el-tab-pane name="seeList" label="查看售后申请列表">
                    <el-card v-for="(item,index) in afterSellerServiceList" :key="index">
                        <div class="oneRequestMsg">
                            <el-row class="header">
                                <el-col class="header-text" :span="8">下单时间:{{item.purchaseTime}}</el-col>
                                <el-col class="header-text" :span="4"> 订单编号:{{item.orderId}} </el-col>
                            </el-row>
                            <el-row class="el-row-body">
                                <el-col :span="3" class="el-row-body-text">
                                  
                                        <img  :src="item.pictureAddress" style="width:120px;height:150px;"/>
                               
                                 </el-col>
                                <el-col :span="3" class="el-row-body-text">{{item.itemTitle}}</el-col>
                                <el-col :span="3" class="el-row-body-text">
                                    <el-row style="margin-bottom:20px">服务单号:{{item.afterServiceId}}</el-row>
                                    <el-row>申请时间:{{item.launchTime}}</el-row>
                                </el-col>   
                                <!-- 按钮合集 -->
                                <el-col :span="3" class="el-row-body-text">{{item.afterServiceState}}</el-col>
                                <el-col :span="3" >

                                        <el-button  size="small" class="buttons-text" type="text" @click="seeDetail(index)">查看详情</el-button>

                                        <el-button size="small" v-if="item.afterServiceState=='等待审核'"  @click="applyReview(index)" class="buttons">审核</el-button>

                                        <el-button size="small" v-if="item.afterServiceState=='等待售后收货'"  @click="checkReceive(index)" class="buttons">售后收货</el-button>

                                        <el-button size="small" v-if="item.afterServiceState=='售后已签收'"  @click="completeAfterService(index)" class="buttons">完成售后</el-button>

                                        <el-button size="small" v-if="item.afterServiceState=='售后已签收'"  @click="requestService(index) " class="buttons">申请平台介入</el-button>

                                        
                                </el-col>
                                
                                <el-col :span="5" class="el-row-body-text">
                                  <el-row v-if="fuck(item.buyerComplaintState)" style="margin-bottom:20px">买家申诉结果: <el-button type="text" @click="showPlatformMsg(item.platfromResponseToBuyer)" >{{item.buyerComplaintState}}</el-button></el-row>
                                  <el-row v-if="fuck(item.sellerComplaintState)" >卖家申诉结果: <el-button type="text" @click="showPlatformMsg(item.platfromResponseToSeller)" >{{item.sellerComplaintState}}</el-button></el-row>
                              </el-col>

                            </el-row>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>

            <!-- 填写审核相关信息 -->
            <el-dialog title="售后审核" :visible.sync="reviewFormVisible">
                <!-- <el-row>
                    <el-col :span="10">服务单号：</el-col>
                    <el-col :span="8">申请时间：</el-col>
                </el-row> -->
                <div class="serviceMsg-box" style="margin-top:15px;">
                    <h3 class="text-title">服务单信息：</h3>
                    <div>
                        <el-row class="msg"> 
                            <el-col :span="5" class="col-title">服务单号</el-col>
                            <!-- 下方传入 服务单号 -->
                            <el-col :span="14" class="col-text"> {{afterSellerServiceList[reviewIndex]?afterSellerServiceList[reviewIndex].afterServiceId :""}} </el-col>      
                        </el-row>
                        <el-row class="msg"> 
                            <el-col :span="5" class="col-title">申请时间</el-col>
                            <!-- 下方传入 申请时间 -->
                            <el-col :span="14" class="col-text"> {{afterSellerServiceList[reviewIndex]?afterSellerServiceList[reviewIndex].launchTime :""}}</el-col>      
                        </el-row>
                        <el-row class="msg"> 
                            <el-col :span="5" class="col-title">退货原因</el-col>
                            <!-- 下方传入 退货原因 -->
                            <el-col :span="14" class="col-text"> {{afterSellerServiceList[reviewIndex]?afterSellerServiceList[reviewIndex].returnReason :""}}</el-col>      
                        </el-row>
                        <el-row class="msg">
                            <el-col :span="5" class="col-title">退款金额</el-col>
                            <!-- 下方传入 退款金额 -->
                            <el-col :span="14" class="col-text">￥ {{afterSellerServiceList[reviewIndex]?afterSellerServiceList[reviewIndex].totalPrice :""}} </el-col>     
                        </el-row>
                        <el-row class="msg">
                            <el-col :span="5" class="col-title">联系人</el-col> 
                            <!-- 下方传入 联系人 -->
                            <el-col :span="14" class="col-text"> {{afterSellerServiceList[reviewIndex]?afterSellerServiceList[reviewIndex].buyerName :""}}</el-col>     
                        </el-row>
                        <el-row class="msg">
                            <el-col :span="5" class="col-title">联系电话</el-col>
                            <!-- 下方传入 联系电话 -->
                            <el-col :span="14" class="col-text"> {{afterSellerServiceList[reviewIndex]?afterSellerServiceList[reviewIndex].buyerPhoneNumber :""}}</el-col>     
                        </el-row>
                        <el-row class="msg">
                            <el-col :span="5" class="col-title">售后服务状态</el-col>
                            <!-- 下方传入 售后服务状态 -->
                            <el-col :span="14" class="col-text"> {{afterSellerServiceList[reviewIndex]?afterSellerServiceList[reviewIndex].afterServiceState :""}}</el-col>     
                        </el-row>
                    </div>
                </div>

                <el-form ref="reviewForm" :model="reviewGood" :rules="reviewRules">
                    <!-- 卖家角度 审核内容 -->
                    <el-form-item>
                        <el-switch v-model="reviewGood.flag" active-text="审核通过" inactive-text="审核不通过"></el-switch>
                    </el-form-item>
            
                    <el-form-item label="审核留言" prop="message">
                        <el-input v-model="reviewGood.message" placeholder="请输入审核留言"></el-input>
                    </el-form-item>

                    <div v-if="reviewGood.flag">
                        <el-form-item label="联系人" prop="sellerName">
                            <el-input v-model="reviewGood.sellerName" ></el-input>
                        </el-form-item>
                        <el-form-item label="联系手机" prop="phoneNumber">
                            <el-input v-model="reviewGood.phoneNumber" ></el-input>
                        </el-form-item>
                        <mapLinkage ref="map" :province="reviewGood.province" :city="reviewGood.city"  ></mapLinkage>
                        <el-form-item label="详细地址" prop="addressDetail">
                            <el-input v-model="reviewGood.addressDetail" ></el-input>
                        </el-form-item>
                    </div>

                    <!-- 确认提交审核信息  -->
                    <el-row type="flex" justify="end">
                        <el-col :span="3">
                            <el-button type="primary" @click="submitReview"  style="margin-top:20px;">确认</el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="danger" @click="reviewFormVisible = false"  style="margin-top:20px;">取消</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>

          <el-dialog title="平台申诉信息" :visible.sync="appealVisible">
            <el-row>
                平台留言：
            </el-row>
            <el-row>
                {{appealMsg}}
            </el-row>
        </el-dialog>

        </el-main>
    </el-container>

     <el-container v-else>
        <el-main>
            <el-button @click="goBack" class="back-button" size="medium" type='text' icon="el-icon-back">返回</el-button>
            <AfterSellerDetail :afterSellerService=" afterSellerServiceList[detailIndex]"></AfterSellerDetail>
        </el-main>
        
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
  async mounted() {
    await this.getSellerAfterServiceList();
  },
  data() {
    return {
      reviewFormVisible: false,
      showList: true,
      detailIndex: 0,
      reviewIndex: 0,
      service: "seeList",
      reviewGood: {
        flag: false,
        message: "",
        province: "",
        city: "",
        addressDetail: "",
        sellerName: "",
        index: "",
        phoneNumber: ""
      },
      reviewRules: {
        sellerName: [
          {
            validator:(rule,value,callback)=>{
              if(value=='' || value==undefined){
                callback(new Error('联系人不能为空'))
              }
              else if(value.length>15){
                callback(new Error("联系人长度不能超过15"))
              }
              else{
                let p = /^[0-9]+$/;
                if(p.test(value)){
                  callback(new Error("联系人不能为纯数字"))
                }
                callback()
              }
            },
            trigger: "blur",
            trigger: "change"
          }
        ],
        phoneNumber: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value == "") {
                callback(new Error("请输入手机号"));
              } else {
                let p = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if (!p.test(value)) {
                  callback(new Error("请输入正确的手机号"));
                } else {
                  callback();
                }
              }
            },
            trigger: "blur",
            trigger: "change"
          }
        ],
        addressDetail: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur",
            trigger: "change"
          },
          {
            min: 1,
            max: 100,
            message: "输入不超过15个字",
            trigger: "blur",
            trigger: "change"
          }
        ],
        message: [
          {
            required: true,
            message: "请输入审核留言",
            trigger: "blur",
            trigger: "change"
          },
          {
            min: 1,
            max: 300,
            message: "输入不超过300个字",
            trigger: "blur",
            trigger: "change"
          }
        ]
      },
      afterSellerServiceList: [],
      appealMsg : '',
      appealVisible : false,
    };
  },
  methods: {
    seeDetail(index) {
      this.detailIndex = index;
      this.showList = false;
    },
    applyReview(index) {
      this.reviewFormVisible = true;
      this.reviewIndex = index;
      let reviewGood = JSON.parse(JSON.stringify(this.reviewGood));
      reviewGood.province = this.afterSellerServiceList[index].province;
      reviewGood.city = this.afterSellerServiceList[index].city;
      reviewGood.addressDetail = this.afterSellerServiceList[
        index
      ].addressDetail;
      reviewGood.sellerName = this.afterSellerServiceList[index].sellerName;
      reviewGood.phoneNumber = this.afterSellerServiceList[
        index
      ].sellerPhoneNumber;
      this.reviewGood = reviewGood
    },
    async submitReview() {
      // 没想好怎么验证
      // let flag = this.$refs.map.test()
      let flag = true;
      this.$refs["reviewForm"].validate(async valid => {
        if (valid && flag) {
          let data = {
            query: "Review",
            data: {
              userId: Cookies.get("userId"),
              sessionId: Cookies.get("sessionId"),
              afterServiceId:
                this.afterSellerServiceList[this.reviewIndex].afterServiceId +
                "",
              reviewFlag: this.reviewGood.flag,
              sellerMessage: this.reviewGood.message,
              addressDetail: this.reviewGood.addressDetail,
              sellerName: this.reviewGood.sellerName,
              province: this.reviewGood.province,
              city: this.reviewGood.city,
              sellerPhoneNumber: this.reviewGood.phoneNumber
            }
          };

          let response = await this.$axios.send(data);
          if (response.status == 1) {
            await this.getSellerAfterServiceList();
            this.reviewFormVisible = false;
            this.$message({ message: "审核成功！", type: "success" });
          } else if (response.status == -1) {
            Cookies.remove("userId");
            Cookies.remove("sessionId");
            Cookies.remove("userName");
            this.$router.push({ path: "/" });
          } else {
            this.$message.error("发生错误:" + response.err);
          }
        }
      });
    },
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
              userId: Cookies.get("userId"),
              sessionId: Cookies.get("sessionId"),
              afterServiceId:
                this.afterSellerServiceList[index].afterServiceId + ""
            }
          };

          let response = await this.$axios.send(data);
          if (response.status == 1) {
            await this.getSellerAfterServiceList();
            this.$message({ message: "发布成功！", type: "success" });
          } else if (response.status == -1) {
            Cookies.remove("userId");
            Cookies.remove("sessionId");
            Cookies.remove("userName");
            this.$router.push({ path: "/" });
          } else {
            this.$message.error("发送错误:" + response.err);
          }
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消收货" });
        });
    },
    requestService(id) {
      this.$router.push({path:'/Appeal',query:{'id':id,'type':1}})
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
              userId: Cookies.get("userId"),
              sessionId: Cookies.get("sessionId"),
              afterServiceId: this.afterSellerServiceList[index].afterServiceId +""
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
          userId: Cookies.get("userId"),
          sessionId: Cookies.get("sessionId")
        }
      };

      let response = await this.$axios.send(data);
      if (response.status == 1) {
        this.afterSellerServiceList = response.data.afterServiceList;
      } else if (response.status == 0) {
        this.$message.error("发送错误:" + response.err);
      } else {
        Cookies.remove("userId");
        Cookies.remove("sessionId");
        Cookies.remove("userName");
        this.$router.push({ path: "/" });
      }
    },
    showPlatformMsg(msg){
        this.appealMsg = msg;
        this.appealVisible = true;
    },
    fuck(state){
        if(state=='无' || state=='' || state==undefined )
            return false;
        return true
    },
  }
};
</script>
