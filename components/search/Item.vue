<template>
    <el-col :span='5' :push="2">
        <img @click="goDetail" class="search-img" :src="item.pictureAddress"/>
        <div @click="goDetail" class="search-text-box">
            <h4 class="search-title">{{item.itemTitle}}</h4>
            <div class="search-text">
                <a class="search-price">￥</a><a class="search-price search-price-number">{{item.price}}</a>
                <a class="search-time">{{item.launchDate}}</a>
            </div>
        </div>
    </el-col>    
</template>

<style scoped>
.search-img {
  height: 320px;
  width: 240px;
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
