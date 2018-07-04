<template>
    <el-col :span=15>
        <el-container class="main-window">
            <!-- 选项卡标题 -->
            <el-header>
                <el-tabs v-model='activeTab' type='card' @tab-click="handleClick">
                    <el-tab-pane label="买家申诉" name="buyerComplain"></el-tab-pane>
                    <el-tab-pane label="卖家申诉" name="sellerComplain"></el-tab-pane>
                </el-tabs>
            </el-header>
            <!-- 选项卡内容 -->
            <el-main>
                <Complain></Complain>
            </el-main>
        </el-container>
    </el-col>
</template>
<style scoped>
.main-window {
  position: relative;
  top: 50px;
  left: 30px;
}

.back-button {
  color: #999;
  font-size: 30px;
  margin-top: 16px;
}
</style>

<script>
import Complain from "~/components/AdminCenter/Complain";


export default {
    components: {
        Complain
    },
}
</script>
