<template>
    <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="4" :push="2">
      <el-card :body-style="{ padding: '5px' }">
        <img @click="goDetail" class="search-img" :src="item.pictureAddress"/>
        <div @click="goDetail" class="search-text-box">
            <h4 class="search-title">{{item.itemTitle}}</h4>
            <div class="search-text">
                <a class="search-price">￥</a><a class="search-price search-price-number">{{item.price}}</a>
                <a class="search-time">{{item.launchDate}}</a>
            </div>
        </div>
      </el-card>
    </el-col>    
</template>

<style scoped>
.search-img {
  height: 320px;
  width:  240px;
  position: relative;
  left: 50%;
  transform: translateX(-120px);
}
.search-img:hover {
  cursor: pointer;
}
.search-text-box:hover {
  cursor: pointer;
}
.search-title {
  font-size: 20px;
}
.search-price {
  float: left;
}

.search-price-number {
  color: red;
  font-size: 18px;
}
.search-time {
  color: #999;
  float: right;
}
.search-text-box {
  margin-top: 20px;
  padding-left: 5px;
  padding-bottom: 30px;
  padding-right: 10px;
  
}
.search-text {
  margin-top: 10px;
}
</style>

<script>
export default {
  mounted() {
    console.log(this.item);
  },
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    goDetail() {
      console.log(this.item.itemId);
      this.$router.push({ path: `item/${this.item.itemId}` });
    }
  }
};
</script>
