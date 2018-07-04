<template>
    <el-main style=" margin:70px 40px 30px -80px;border-style: solid;border-color: rgb(238, 238, 238);">  
        <el-row class="row1 status" >
            <el-col :span="6" style="color:red">处理状态：</el-col>
            <el-col :span="6" :offset="2">申诉单号：</el-col>
            <el-col :span="10"  >申诉申请时间：</el-col>
        </el-row>
        <!-- 售后信息 -->
        <div>
            <h3 style="color:#cccccc;">售后服务信息：</h3>
            <el-card  class="container">
                <el-row class="header">
                    <el-col class="header-text" :span="4">下单时间:</el-col>
                    <el-col class="header-text" :span="4"> 订单编号: </el-col>
                </el-row>
                <el-row class="el-row-body">
                    <el-col :span="3" >
                        <div >
                            <img class='itemPic'/>
                        </div>
                    </el-col>
                    <el-col :span="3" class="el-row-body-text">
                       图书标题
                    </el-col>
                    <el-col :span="5" class="el-row-body-text">
                        <el-row style="margin-bottom:20px">服务单号:</el-row>
                        <el-row>申请时间:</el-row> 
                    </el-col>
                
                    <!-- 查看详情按钮 -->
                    <el-col class='el-row-body-text ' :span="6">
                        <el-button>查看服务详情</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <!-- 申诉信息 理由 凭证 联系人 联系电话 -->
        <el-row class="row1">
            <h3 style="color:#cccccc;">申诉信息：</h3>
            <div style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;padding:20px;line-height:25px;">
                <p >申诉理由</p>
                <p style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;padding:20px;">申诉理由哈哈哈哈或或或或</p>
                <p>申诉凭证：</p>
                <li>联系姓名</li>
                <li>联系电话</li>
            </div>
        </el-row>
        <el-row class = "row1">
            <h3 style="color:#cccccc;">处理方案</h3>
            <div style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;padding:20px;line-height:25px;">
                <P >客服留言：</P>
                <el-input style="margin-top: 10px" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                </el-input>
                <el-button>通过</el-button>
                <el-button>拒绝</el-button>
            </div>

        </el-row>

    </el-main>
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
.row1 {
    margin-bottom: 30px;
    /* margin-top: 30px;  */
}

.status{
    background-color: #eeebeb;
    width:100%;
    padding:20px;
    
}
</style>

<script>
export default {
    
}
</script>

