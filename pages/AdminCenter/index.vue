<template>

    <el-container style="min-height:600px;">
        <el-header>
            <AdminNavTop></AdminNavTop>
        </el-header>
        <el-main>
            <el-col :span="4">
                    <AdminNavLeft :active='currentMainIndex' @changeTab='changeTab'></AdminNavLeft>
            </el-col>
                <el-col v-if="showDetail" :span="18">
                    <ComplainDetail @goback='goback' :complaint='onShowComplaint'></ComplainDetail>
                </el-col>
                <el-col v-else :span='20'>
                    <el-container class="main-window">
                        <!-- 选项卡标题 -->
                        <el-header>
                            <el-tabs v-model='activeTab' type='card' @tab-click="handleClick">
                                <el-tab-pane label="买家申诉" name="buyerComplain"></el-tab-pane>
                                <el-tab-pane label="卖家申诉" name="sellerComplain"></el-tab-pane>
                            </el-tabs>
                        </el-header>
                        <!-- 选项卡内容 -->
                        <el-main style='min-height:300px;'>
                            <Complain v-for="comp in complaints" :key="'copm'+comp.complianId" :complaint='comp'></Complain>
                        </el-main>
                    </el-container>
                </el-col>
        </el-main>

        
    </el-container>    

</template>

<style>
.main-window {
  position: relative;
  top: 50px;
  left: 30px;
}
</style>


<script>
import AdminNavTop from "~/components/AdminCenter/AdminNavTop";
import AdminNavLeft from "~/components/AdminCenter/AdminNavLeft";
import ComplainDetail from "~/components/AdminCenter/ComplainDetail";
import Complain from "~/components/AdminCenter/Complain";
import Cookies from "js-cookie";
export default {
  components: {
    AdminNavTop,
    AdminNavLeft,
    ComplainDetail,
    Complain
  },
  async mounted() {
    let query = {
      query: "getAppealList",
      data: {
        adminId: Cookies.get("adminId"),
        sessionId: Cookies.get("sessionId")
      }
    };
    let response = await this.$axios.send(query);
    if (response.status == 1){
        this.complaints = response.data.appealList;
    } else if (response.status == 0){
        this.$message.error("发生错误："+response.err)
    } else {
        Cookies.remove('adminId')
        Cookies.remove('sessionId')
        this.$message.error("登录超时！")
        this.$router.push({path:"/"})
    }
  },
  data() {
    return {
      currentMainIndex: "1",
      showDetail: true,
      onShowComplaint: {
        
      },
      complaints: [
        
      ]
    };
  },
  methods: {
    changeTab(index, indexPath) {
      // console.log(index, indexPath);
      let name = {
        "1": "DealComplain"
      };
      this.currentMain = name[index];
      this.currentMainIndex = index;
      let adminId = Cookies.get("AdminId");
      // this.$router.push({ path: `/home/${userId}` ,query:{index:index}});
    },
    goback() {
      this.showDetail = false;
    }
  }
};
</script>
