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

          <!-- 新书上架组件  6/28 16:30 修改测试-->
          <div class="newBookBox" >
            <el-col style="color: #99a9bf;font-size:28px;text-align:left;margin-top:-80px;">新书上架
              <hr style="margin-top:-50px;">
            </el-col>
            <el-row style="margin-left:5px;">
              <el-col :span="3" v-for="book in newBooks" :key='"recent"+book.itemId' :offset="1">
                <el-card :body-style="{ padding: '10px' }" class="goods" >
                  <img @click='lookDetail(book.itemId)'  class="image" :src="book.pictureAddress">
                  <div style="text-align:left;padding-left:10px;margin-top:20px;">
                    <div class="recent-title"> {{book.itemTitle}}</div>
                    <div class="bottom" @click='lookDetail(book.itemId)'>
                      <p style="font-weight:500;color:red;">￥ {{book.price}}</p>
                      <el-button type="text" @click='lookDetail(book.itemId)' class="button">查看详情</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
             </el-row> 
          </div>
    </el-main>
    
    <NavBottom></NavBottom>
  </div>
</template>

<script>
import NavTop from "~/components/NavTop";
import SearchBox from "~/components/SearchBox";
import NavBottom from "~/components/NavBottom";
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
    SearchBox,
    NavBottom
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
      this.$router.push({
        path: "/search",
        query: { text: text, tag: tag, time_stamp: new Date() - 0 }
      });
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

.recent-title {
  font-weight: 900;
  font-size: 18px;
  line-height: 20px;
  height: 20px;
  overflow: hidden;
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

.el-input__inner {
  height: 70px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
}
.el-carousel__item:nth-child(3n) {
  background-color: white;
  background-image: url("../assets/6.jpg");
  background-size: 100% 100%;
  height: 430px;
}
.el-carousel__item:nth-child(3n + 1) {
  background-color: #d3dce6;
  background-image: url("../assets/7.jpg");

  height: 430px;
}
.el-carousel__item:nth-child(3n + 2) {
  background-color: #d3dce6;
  background-image: url("../assets/8.jpg");
  
  height: 430px;
  
}

.goods {
  float: left;
  margin: 15px 1%;
  border-style: dashed;
  border-color: #e9eef3;
  padding-bottom: 0%;
}

.search-box {
  margin-top: -50px;
  padding: 10px;
}
.service-box {
  margin: 0 20px 30px 20px;
  background-color: white;
}
.show-box {
  margin: 0 20px 0 20px;
  background-color: rgb(240, 239, 239);
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  padding-bottom: 0px;
  /* padding-right: 15px; */
}
.button {
  margin-top: -10px;
  padding: 0;
  float: right;
}
.image {
  width: 210px;
  height: 280px;
  display: block;
}
</style>
