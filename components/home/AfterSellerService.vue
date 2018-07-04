<template>
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
                                <el-col :span="4" class="el-row-body-text">
                                    <el-button v-if="item.afterServiceState=='等待审核'" @click="applyReview(index)">审核</el-button>
                                    <el-button v-if="item.afterServiceState=='等待售后收货'" @click="checkReceive(index)">售后收货</el-button>
                                    <el-button v-if="item.afterServiceState=='卖家已签收'" @click="completeAfterService(index)" style="margin-top:15px;">完成售后</el-button>
                                    <el-button v-if="item.afterServiceState=='卖家已签收'" @click="requestService(index)">申请介入</el-button>
                                    <el-button type="text" size="small" class="button-text" @click="seeDetail(index)">查看详情</el-button>
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
                <div>

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
        <AfterSellerDetail :afterSellerService="afterSellerServiceList[detailIndex]"></AfterSellerDetail>
    </el-container>
</template>

<style scoped>
.back-button {
  color: #999;
  font-size: 30px;
  margin-top: 16px;
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
.button-text {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: -20px;
  font-size: 14px;
  display: block;
  text-decoration: none;
}
</style>

<script>
import AfterSellerDetail from "~/components/home/AfterSellerDetail";
import mapLinkage from '~/components/home/mapLinkage'
import Cookies from 'js-cookie'
export default {
    components:{
        AfterSellerDetail,
        mapLinkage,
    },
    mounted(){
        this.getSellerAfterServiceList()
    },
    data() {
        return {
            reviewFormVisible:false,
            showList:true,
            detailIndex : 0,
            service : 'seeList',
            reviewGood :{
                flag : false,
                message : '',
                province:'',
                city:'',
                addressDetail:'',
                sellerName : '',
                index : '',
            },
            afterSellerServiceList :[]
        }
    },
    methods:{
        seeDetail(index){
            this.detailIndex = index;
            this.showList = false;
        },
        applyReview(index){
            this.reviewFormVisible = true;
            this.reviewGood.index = index
        },
        updateArea(province,city){

        },
        checkReceive(index){
            this.$confirm('请问是否确认收货？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async() => {

                let data = {
                    query : 'afterSalesReceipt',
                    data : {
                        userId:Cookies.get("userId"),
                        sessionId: Cookies.get("sessionId"),
                        afterServiceId:this.afterSellerServiceList[index].afterServiceId,
                    }
                }

                let response = await this.$axios.send(data);
                if (response.status == 1) {
                    await this.getSellerAfterServiceList()
                    this.$message({ message: "发布成功！",type: "success"});
                } else if (response.status == 0) {
                    this.$message.error("发送错误:" + response.err);
                } else {
                    Cookies.remove("userId");
                    Cookies.remove("sessionId");
                    Cookies.remove("userName");
                    this.$router.push({ path: "/" });
                }
                
            }).catch(()=>{
                this.$message({  type: 'info', message: '已取消收货'});
            });
        },
        requestService(index){

        },
        completeAfterService(index){
            this.$confirm('是否确认完成售后？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( async()=>{
                let data = {
                    query : 'finishReturn',
                    data : {
                        userId:Cookies.get("userId"),
                        sessionId: Cookies.get("sessionId"),
                        afterServiceId:this.afterSellerServiceList[index].afterServiceId,
                    }
                }

                let response = await this.$axios.send(data);
                if (response.status == 1) {
                    await  this.getSellerAfterServiceList()
                    this.$message({ message: "发布成功！",type: "success"});
                } else if (response.status == 0) {
                    this.$message.error("发送错误:" + response.err);
                } else {
                    Cookies.remove("userId");
                    Cookies.remove("sessionId");
                    Cookies.remove("userName");
                    this.$router.push({ path: "/" });
                }

            }).catch(()=>{
                this.$message({
                    type:'info',
                    message: '取消确认售后完成。'
                });
            });
        },
        goBack(){
            this.showList=true;
        },
        async getSellerAfterServiceList(){
            let data = {
                query : 'getSellerAfterServiceList',
                data : {
                    userId:Cookies.get("userId"),
                    sessionId: Cookies.get("sessionId"),
                }
            }

            let response = await this.$axios.send(data);
            if (response.status == 1) {
                this.afterSellerServiceList = response.data.afterServiceList

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
}
</script>
