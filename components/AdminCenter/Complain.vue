<template>
    <el-row>
        <!-- 第一部分信息 -->
        <el-row>
            <div class="header">
               <el-col class="header-text" :span="8">申诉时间: {{complain.launchTime}}</el-col>
               <el-col class="header-text" :span="8">申诉编号: {{complain.complaintId}}</el-col>
               <el-col style="text-align:center;" class="header-text" :span="4">状态: {{complain.complaintState}}</el-col>
            </div>
        </el-row>
        <!-- 第二部分信息 -->
        <el-row>
            <div>
            <el-col class='order-box' :span='16'>{{complain.description}}</el-col>
            <el-col  style="text-align:center;" class='order-box' :span='8'>
                <el-button class="order-button">查看详情</el-button>
            </el-col>
            </div>
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
  margin-top: 10px;
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
export default {
    data() {
        return {
            complain: {
                complaintId: '111',
                launchTime: "20180101 18:16",
                description: "我看照片是红色的，结果发过来是绿色的",
                complaintState: "等待处理"
            }
        };
    }
    
}
</script>
