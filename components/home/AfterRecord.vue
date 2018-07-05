<template>
    <!-- 买家角度： 查看申请记录列表 -->
<div>
    <el-card  v-for="(item,index) in afterServiceList" :key="index"  class="container">
        <el-row class="header">
            <el-col class="header-text" :span="4">下单时间:{{item.purchaseTime}}</el-col>
            <el-col class="header-text" :span="4"> 订单编号:{{item.orderId}} </el-col>
        </el-row>
        <el-row class="el-row-body">
            <el-col :span="3" >
                <div >
                    <img class='itemPic' :src='item.pictureAddress'/>
                </div>
            </el-col>
            <el-col :span="3" class="el-row-body-text">
                {{item.itemTitle}}
            </el-col>
            <el-col :span="5" class="el-row-body-text">
                <el-row style="margin-bottom:20px">服务单号:{{item.afterServiceId}}</el-row>
                <el-row>申请时间:{{item.launchTime}}</el-row> 
            </el-col>
            <el-col :span="4" class="el-row-body-text" style="font-weight:600;">
                {{item.afterServiceState}}
            </el-col>
        
            <!-- 所有按钮 -->
            <el-col class='el-row-body-text ' :span="6">
                <el-button @click="seeDetail(index)">查看服务详情</el-button>
                 <!-- 等待审核状态 对应按钮 -->
                <el-button @click="cancelApply(item.afterServiceId)" v-if="cancel(index)" type="text" class="stateBtn" size='small'>取消售后申请</el-button>  
                <!-- 等待退货状态 对应按钮 -->
                <el-button @click="returnOfGoods(item.afterServiceId)" v-if='returnGoods(index)' type="text" class="stateBtn" size="small">退货</el-button>
               <!-- 拒绝退货状态 对应按钮 -->
               <el-button @click="requestService(item.afterServiceId)" v-if='service(index)'  type="text warning" class="stateBtn" size='small'>申诉</el-button>
            </el-col>

            <!-- 填写退货物流相关信息 -->
            <el-dialog title="收货地址" :visible.sync="returnFormVisible">
                <el-form :model="returnGood">
                    <el-form-item label="快递公司" >
                        <el-cascader :options="options" v-model="returnGood.sender" placeholder="请选择快递公司"></el-cascader>
                    </el-form-item>
                    <el-form-item label="快递单号" >
                        <el-input v-model="returnGood.code" placeholder="请输入快递单号"></el-input>
                    </el-form-item>
                    <!-- 确认提交退货物流信息  -->
                    <el-button @click="doReturn(item.afterServiceId)" type="primary" style="margin-left:85%;margin-top:20px;">确认</el-button>
                </el-form>
            </el-dialog>

            <!-- 填写申诉相关信息 -->
            <el-dialog title="买家申诉" :visible.sync="appealFormVisible">
                <el-form :model="appealGood">
                    <el-form-item label="申诉理由" >
                        <el-input v-model="appealGood.reason" placeholder="请输入请输入申诉理由"></el-input>
                    </el-form-item>
                    <!-- 确认提交申诉信息  -->
                    <el-button @click="doReturn(item.afterServiceId)" type="primary" style="margin-left:85%;margin-top:20px;">确认</el-button>
                </el-form>
            </el-dialog>


        </el-row>
        
    </el-card>
</div>
</template>

<style scope>
.container{
    margin: 20px 5px;
    border-style: solid;
    border-width: 3px;
}
.header {
  background-color: rgb(249, 249, 249);
  height: 40px;
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
.itemPic{
   width: 90px;
   height: 120px;
   margin: 10px;
}
.order-box {
  border-width: 2px 2px 2px 0;
  border-style: solid;
  border-color: rgb(249, 249, 249);
  height: 140px;
}
.order-box:first-child {
  border-left-width: 2px;
}
.stateBtn{
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: -20px;
  font-size: 14px;
  display: block;
  text-decoration: none;
}
</style>

<script>
import Cookies from 'js-cookie'
export default { 
    mounted(){
    },
    props:["afterServiceList"],
    data(){
        return {
            afterService: {
                afterServiceId : '',
                launchTime : '',
                returnReason : '',
                totalPrice : '',
                description : '',
                buyerName : '',
                phoneNumber : '',
                purchaseTime : '',
                orderId : '',
                itemTitle : '',
                pictureAddress:'',
                afterServiceState:''
            },
            // 物流公司 选项
            options: [{
                value: '顺丰',
                label: '顺丰',
                }, {
                    value: '京东',
                    label: '京东',
                },{
                    value: '韵达',
                    label: '韵达'
                },{
                    value: '中通',
                    label: '中通',
                },{
                    value: '圆通',
                    label: '圆通',
                },{
                    value: '申通',
                    label: '申通',
                },{
                    value: '百世汇通',
                    label: '百世汇通'
                },{
                    value: '天天',
                    label: '天天'
                },{
                    value: '邮政',
                    label: '邮政'
                },{
                    value: '当当',
                    label: '当当'
                },{
                    value: '亚马逊',
                    label: '亚马逊'
                },{
                    value: '如风达',
                    label: '如风达'
                },{
                    value: '快捷',
                    label: '快捷'
                },{
                    value: '德邦',
                    label: '德邦'
                },{
                    value: '万象',
                    label: '万象'
                },{
                    value: '其他',
                    label: '其他'
                }
            ],
            returnFormVisible:false,
            appealFormVisible:false,
            returnGood: {
                sender: [],
                code: ""
            },
            appealGood : {
                reason : '',

            },
        }
    },

    methods :{
        cancel(index){
            if(this.afterServiceList[index].afterServiceState == "等待审核") return true;
            else return false;
        },
         returnGoods(index){
            if(this.afterServiceList[index].afterServiceState == "等待退货") return true;
            else return false;
        },
        service(index){
            if(this.afterServiceList[index].afterServiceState == "审核不通过") return true;
            else return false;
        },
        seeDetail(index){
            // this.afterService = this.afterServiceList[index]
            this.$emit("seeDetail",index)
        },
        returnAfterRecord(){
            this.visible = true
        },
        
        async cancelApply(afterServiceId){
            console.log("现在点击了 取消申请售后");
            let data = {
                query : 'cancelAfterService',
                data : {
                    userId : Cookies.get("userId"),
                    sessionId : Cookies.get("sessionId"),
                    afterServiceId : afterServiceId+"",
                }
            }
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.$emit("freshList")
                this.returnFormVisible = false;
            }
            else if (response.status == -1) {
                this.$message.error("登录超时！");
                Cookies.remove("userId");
                Cookies.remove("sessionId");
                Cookies.remove("userName");
                this.$router.push({ path: "/" });
            } else {
                this.$message.error("发生错误：" + response.err);
            }
        },
        returnOfGoods(){
            console.log("现在点击了 退货按钮，准备填写退货信息");
            this.returnFormVisible = true;
        },
        requestService(id){
            console.log("现在点击了 申请平台介入 按钮");
            // console.log(this.afterServiceList)
            this.$router.push({path:'/Appeal',query:{'id':id,'type':2}})
        },
        async doReturn(afterServiceId){

            let data = {
                query : 'doReturn',
                data : {
                    userId : Cookies.get("userId"),
                    sessionId : Cookies.get("sessionId"),
                    afterServiceId : afterServiceId+"",
                    expressCompany : this.returnGood.sender[0],
                    expressCode : this.returnGood.code,
                }
            }
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.$emit("freshList")
                this.returnFormVisible = false;
            }
            else if (response.status == -1) {
                this.$message.error("登录超时！");
                Cookies.remove("userId");
                Cookies.remove("sessionId");
                Cookies.remove("userName");
                this.$router.push({ path: "/" });
            } else {
                this.$message.error("发生错误：" + response.err);
            }
        },

    }
}
</script>
