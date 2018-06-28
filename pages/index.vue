<template>
<div>
  <NavTop></NavTop>

    <el-main class="show-box">
      
           <el-carousel indicator-position="outside">
              <el-carousel-item v-for="item in 4" :key="item">
                <!-- <img src="../assets/6.jpg"> -->
              </el-carousel-item>
          </el-carousel>

          <!-- 搜索框组件 -->
          <SearchBox @doSearch='doSearch' ref = 'searchbox' class="search-box"></SearchBox>

          <!-- 新书上架组件 -->
          <div class="newBookBox" >
            <el-col style="color: #99a9bf;font-size:28px;text-align:left;margin-top:-80px;">新书上架
              <hr style="margin-top:-50px;">
            </el-col>
            <div
            v-for="book in newBooks"
            :key='"recent"+book.itemId'
            class="goods" >
                  <img @click='lookDetail(book.itemId)' class='goods-img' :src="book.pictureAddress">
                  <div @click='lookDetail(book.itemId)' style="margin-top:-100px;"> 
                      <p style="margin-top:-50px;margin-left:10px;font-weight:900;">{{book.itemTitle}}</p>
                      <p style="margin-top:-120px;margin-left:10px;">价格： {{book.price}}</p>
                      <div style="margin-top:-120px;margin-left:10px;">
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
  mounted() {
    this.getRecent();
  },
  data() {
    return {
      newBooks: []
    };
  },
  components: {
    NavTop,
    SearchBox
  },

  methods: {
    async getRecent() {
      let data = {
        query: "getRecent",
        data: {
          number: 5
        }
      };
      let response = await this.$axios.send(data);
      if (response.status == 1) {
        this.newBooks = response.data.items;
      } else {
        this.$message.error("发生错误：" + response.err);
      }
    },
    lookDetail(item_id) {
      // console.log(item_id)
      this.$router.push({ path: `/item/${item_id}` });
    },
    doSearch(text, tag) {
      this.$router.push({ path: "/search", query: { text: text, tag: tag } });
    }
  },
  watch: {
    $route(to, from) {
      this.getRecent();
    }
  }
};
</script>

<style scoped>

/* body {
  background-color: #050505;
  font-family: Hiragino Sans GB;
} */

.index-input-box {
  font-size: 20px;
}

.el-header,.el-footer {
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
    font-size: 18px;
    opacity: 0.75;
    line-height: 400px;
    
  }
  .el-carousel__item:nth-child(2n) {
    background-color:white;
    background-image: url("../assets/6.jpg");
    height: 430px;

  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    background-image: url("../assets/7.jpg");
    height: 430px; 
     
  }
.goods {
  float: left;
  margin: 20px 5%;

  border-style: dashed;
  border-color: #e9eef3;
}
.goods-img {
  width: 120px;
  height: 160px;
}
.search-box {
  margin-top: -50px;
  padding:10px;
}
.show-box{
  margin:0 20px 30px 20px;
  background-color: rgb(240, 239, 239);
}
</style>
