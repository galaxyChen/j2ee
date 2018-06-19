<template>
<div>
  <NavTop></NavTop>

    <el-main>
        <el-carousel :interval="4000" type="card" height="320px">
              <el-carousel-item v-for="item in 5" :key="item">
                  <!-- 待修改，此处仅作静态页面展示 -->
                  <img src="../assets/6.jpg">
                  <h3>{{ item }}</h3>
                  
              </el-carousel-item>
          </el-carousel>

          <!-- 搜索框组件 -->
          <SearchBox class="search-box"></SearchBox>
          

          <!-- 新书上架组件 -->
          <div id="newBookBox"  style="text-align:left;">
            <el-button type="text" style="color:green;font-size:28px;">新书上架</el-button> 
            <hr style="margin-top:-50px;">

            <div class="goods" >
                <img class='goods-img' src="../assets/2.jpg">
                <div style="margin-top:-100px;"> 
                    <p style="margin-top:-50px;margin-left:10px;">{{booktitle1}}</p>
                    <p style="margin-top:-100px;margin-left:10px;">价格： {{price1}}</p>
                    <div style="margin-top:-100px;margin-left:10px;">
                        <el-button type="primary" >查看详情</el-button>
                    </div>
                </div>
            </div>

            <div class="goods">
                <img class='goods-img' src="../assets/3.jpg">
                <div style="margin-top:-100px;">
                    <p style="margin-top:-50px;margin-left:10px;">{{booktitle2}}</p>
                    <p style="margin-top:-100px;margin-left:10px;">价格： {{price2}}</p>
                    <div style="margin-top:-100px;">
                        <el-button type="primary" >查看详情</el-button>
                    </div>
                </div>
            </div>

            <div class="goods" >
                <img class='goods-img' src="../assets/4.jpg">
                <div style="margin-top:-100px;">
                    <p style="margin-top:-50px;margin-left:10px;">{{booktitle3}}</p>
                    <p style="margin-top:-100px;margin-left:10px;">价格： {{price3}}</p>
                    <div style="margin-top:-100px;"> 
                          <el-button type="primary" >查看详情</el-button>
                    </div>
                </div>
            </div>

            <div class="goods">
                <img class='goods-img' src="../assets/5.jpg">
                <div style="margin-top:-100px;">
                    <p style="margin-top:-50px;margin-left:10px;">{{booktitle4}}</p>
                    <p style="margin-top:-100px;margin-left:10px;">价格： {{price4}}</p>
                    <div style="margin-top:-100px;">
                        <el-button type="primary" >查看详情</el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-main>
  </div>
</template>

<script>
import NavTop from "~/components/NavTop";
import SearchBox from "~/components/SearchBox";
export default {
  data() {
    return {
      booktitle1: "新东方GRE词汇1",
      booktitle2: "新东方GRE词汇2",
      booktitle3: "新东方GRE词汇3",
      booktitle4: "新东方GRE词汇4",

      price1: "￥30",
      price2: "￥30",
      price3: "￥30",
      price4: "￥30"
    };
  },
  components: {
    NavTop,
    SearchBox
  },
  
  methods: {
    changeValue(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>
.search-box{
  margin-top: -100px;
}

body {
  background-color: #d3dce6;
  font-family: Hiragino Sans GB;
}

.index-input-box {
  font-size: 20px;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333333;
  /* text-align: center; */
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-input__inner {
  height: 70px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: left;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.goods {
  float: left;
  margin: 20px 4%;

  border-style: dashed;
  border-color: #e9eef3;
}
.goods-img{
  width: 120px;
  height: 160px;
}
</style>
