<template>
    <el-row class='complaint-box'>
        <!-- 第一部分信息 -->
        <el-row>
            <div class="header">
               <el-col class="header-text" :span="6">申诉时间: {{complaint.launchTime}}</el-col>
               <el-col class="header-text" :span="6">申诉编号: {{complaint.complaintId}}</el-col>
               <el-col class="header-text" :span="4">申诉人: {{complaint.name}}</el-col>
               <el-col style="text-align:center;" class="header-text" :span="4">状态: {{complaint.complaintState}}</el-col>
            </div>
        </el-row>
        <!-- 第二部分信息 -->
        <el-row>
            <div>
            <el-col :span='20' >
              <div class="description">{{complaint.description}}</div>
            </el-col>
            <el-col class="col-box"  :span='4'>
                <el-button @click="lookDetail" class="complaint-button">查看详情</el-button>
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

.complaint-box {
  border-width: 2px 2px 2px 2px;
  border-style: solid;
  border-color: rgb(249, 249, 249);
  height: 140px;
}
.complaint-box:last-child {
  border-bottom-width: 2px;
}
.col-box {
  text-align: center;
  border-left: 2px solid rgb(249, 249, 249);
  height: 100px;
}
.description {
  margin: 10px 0 0 10px;
  height: 82px;
  overflow-y: auto;
}
.complaint-button{
  margin-top: 10px;
}
</style>

<script>
export default {
  props:['complaint'],
  data() {
    return {
      
    };
  },
  methods:{
    lookDetail(){
      this.$emit('lookComplain',this.complaint.complaintId)
    }
  }
};
</script>
