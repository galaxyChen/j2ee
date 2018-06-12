<template>
    <div class='item-detail'>
        <el-row class = 'item-row'>
            <h3>{{item.title}}</h3>
        </el-row>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <h4>作者：{{item.author}}</h4>
            </el-col>
            <el-col :span='8'>
                <h4>出版社：{{item.publisher}}</h4>
            </el-col>
            <el-col :span='8'>
                <h4>出版日期：{{item.publish_date}}</h4>
            </el-col>
        </el-row>
        <div class='item-line'></div>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <h4>发布者：{{item.seller}}</h4>
            </el-col>
        </el-row>
        <el-row class = 'item-row'>
            <el-col :span='8'>
                <h4>包邮：{{item.mail_free}}</h4>
            </el-col>
            <el-col :span='8'>
                <h4>上架时间：{{item.date}}</h4>
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
                    <el-input-number size='small' v-model="number" @change="handleChange" :min="1" :max="item.store" label="描述文字"></el-input-number>
                    <a>&nbsp;&nbsp;库存：{{item.store}}</a>
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
