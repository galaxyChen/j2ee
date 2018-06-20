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
          <SearchBox ref = 'searchbox' class="search-box"></SearchBox>
          

          <!-- 新书上架组件 -->
          <div id="newBookBox"  style="text-align:left;">
            <p type="text" style="color:green;font-size:28px;">新书上架</p> 
            <hr style="margin-top:-50px;">
            <div
            v-for="book in newBooks"
            :key='"recent"+book.itemId'
            class="goods" >
                  <img class='goods-img' :src="book.pictureAddress">
                  <div style="margin-top:-100px;"> 
                      <p style="margin-top:-50px;margin-left:10px;">{{book.itemTitle}}</p>
                      <p style="margin-top:-100px;margin-left:10px;">价格： {{book.price}}</p>
                      <div style="margin-top:-100px;margin-left:10px;">
                          <el-button type="primary" @click='lookDetail(book.itemId)'>查看详情</el-button>
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
  async mounted(){
    let data = {
      query:'getRecent',
      data:{
        number:5
      }
    }
    let response = await this.$axios.send(data);
    if (response.status==1){
      this.newBooks = response.data.products;
    } else {
      this.$message.error("发生错误："+response.err)
    }
  },
  data() {
    return {
      newBooks:[]
    };
  },
  components: {
    NavTop,
    SearchBox
  },
  
  methods: {
    lookDetail(item_id){
      console.log(item_id)
      this.$router.push({ path: `/item/${item_id}` })
    }
  },
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
