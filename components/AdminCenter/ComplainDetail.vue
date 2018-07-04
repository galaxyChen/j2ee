
<template>
    <el-container>
        <el-header>
        <el-button @click="goBack" class="back-button" size="big" type='text' icon="el-icon-back">返回</el-button>
    </el-header>
    <el-main>  
        <el-row class="row1 status" >
            <el-col :span="6" style="color:red">处理状态：{{complaint.sellerComplaintState}}</el-col>
            <el-col :span="6" :offset="2">申诉单号：{{complaint.complaintId}}</el-col>
            <el-col :span="10"  >申诉申请时间：{{complaint.launchTime}}</el-col>
        </el-row>
        <!-- 售后信息 -->
        <div>
            <h3 style="color:#cccccc;">售后服务信息：</h3>
            <el-card  class="container">
                <el-row class="header">
                    <el-col class="header-text" :span="4"> 售后编号:{{complaint.afterServiceId}} </el-col>
                    <el-col class="header-text" :span="4"> 售后申请时间:{{service.launchTime}} </el-col>
                </el-row>
                <el-row class="el-row-body">
                    <el-button>查看订单详情</el-button>
                    <el-button>查看售后服务详情</el-button>
                </el-row>
            </el-card>
        </div>
        <!-- 申诉信息 理由 凭证 联系人 联系电话 -->
        <el-row class="row1">
            <h3 style="color:#cccccc;">申诉信息：</h3>
            <div style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;padding:20px;line-height:25px;">
                <p >申诉理由</p>
                <p style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;padding:20px;">{{complaint.description}}</p>
                <p>申诉凭证：</p>
                <li>联系姓名:{{complaint.name}}</li>
                <li>联系电话:{{complaint.phoneNumber}}</li>
            </div>
        </el-row>
        <el-row class = "row1">
            <h3 style="color:#cccccc;">处理方案</h3>
            <div style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;padding:20px;line-height:25px;">
                <P >客服留言：</P>
                <el-input style="margin: 10px 0;" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                </el-input>
                <el-button type='success'>通过</el-button>
                <el-button type='danger'>拒绝</el-button>
            </div>

        </el-row>
    </el-main>
    </el-container>
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

.stateBtn{
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: -20px;
  font-size: 14px;
  display: block;
  text-decoration: none;
}
.row1 {
    margin-bottom: 30px;
    /* margin-top: 30px;  */
}

.status{
    background-color: #eeebeb;
    width:100%;
    padding:20px;
    
}
.back-button{
    font-size: 20px;
}
</style>

<script>
export default {
    props:['complaint'],
    data(){
        return {
            service:{
                launchTime:'1',
            }
        }
    },
    methods:{
        goBack(){
            this.$emit('goback')
        }
    }
}
</script>

