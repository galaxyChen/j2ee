<template>
    <div class='item-detail'>
        <el-row class = 'item-row'>
            <h3>{{item.itemTitle}}</h3>
        </el-row>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <h4>作者：{{item.author}}</h4>
            </el-col>
            <el-col :span='8'>
                <h4>出版社：{{item.press}}</h4>
            </el-col>
            <el-col :span='8'>
                <h4>出版日期：{{item.publicationTime}}</h4>
            </el-col>
        </el-row>
        <div class='item-line'></div>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <h4>发布者：{{item.sellerId}}</h4>
            </el-col>
        </el-row>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <h4>包邮：{{item.freePostage==1?'是':'否'}}</h4>
            </el-col>
            <el-col :span='9'>
                <h4>上架时间：{{item.launchDate}}</h4>
            </el-col>
        </el-row>
        <div class='item-line'></div>
        <el-row class = 'item-row'>
            <el-col :span='12'>
                价格：<a class='item-price'>￥{{item.price}}</a>
            </el-col>
            <el-col :span='12'>
                <template>
                    <a>数量&nbsp;&nbsp;</a>
                    <el-input-number size='small' v-model="number" @change="handleChange" :min="1" :max="item.quantity" label="描述文字"></el-input-number>
                    <a>&nbsp;&nbsp;库存：{{item.quantity}}</a>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-button class='item-add' round type='danger'>加入购物车</el-button>
        </el-row>
    </div>
</template>


<script>
export default {
  props: ["item"],
  data() {
    return {
        number:1
    };
  },
  methods: {
    handleChange(num) {
      this.number = num;
    }
  }
};
</script>
