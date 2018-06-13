<template>
    <el-container>
        <el-header>
            <NavTop :logined='false' :user='{}'></NavTop>
        </el-header>
        <el-main>
            <el-row>
                <SearchBox></SearchBox>
            </el-row>
            <el-row>
                <ItemRow v-for="(row,index) in rows" :row='row' :key='index'></ItemRow>
            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped>
</style>

<script>
import SearchBox from "~/components/SearchBox";
import NavTop from "~/components/NavTop";
import ItemRow from "~/components/search/ItemRow";
export default {
  components: {
    SearchBox,
    NavTop,
    ItemRow
  },
  data() {
    return {
      itemList: [
        {
          id: "1",
          title: "三体",
          seller: "张三",
          price: "30",
          time: "2018-01-01"
        },
        {
          id: "1",
          title: "三体",
          seller: "张三",
          price: "30",
          time: "2018-01-01"
        },
        {
          id: "1",
          title: "三体",
          seller: "张三",
          price: "30",
          time: "2018-01-01"
        },
        {
          id: "1",
          title: "三体",
          seller: "张三",
          price: "30",
          time: "2018-01-01"
        },
        {
          id: "1",
          title: "三体",
          seller: "张三",
          price: "30",
          time: "2018-01-01"
        }
      ]
    };
  },
  computed: {
    rows() {
      let result = [];
      let count = 0;
      let temp = [];
      for (let i = 0; i < this.itemList.length; i++) {
        count += 1;
        temp.push(this.itemList[i]);
        if (count === 4) {
          result.push(JSON.parse(JSON.stringify(temp)));
          temp = [];
          count = 0;
        }
      }
      if (count != 0) {
        result.push(JSON.parse(JSON.stringify(temp)));
      }
      return result;
    }
  }
};
</script>
