<template>
    <el-container>
        <el-header>
            <NavTop ></NavTop>
        </el-header>
        <el-main>
            <el-row>
                <SearchBox></SearchBox>
            </el-row>
            <el-row>
                <ItemRow v-for="(row,index) in rows" :row='row' :key='"row"+index'></ItemRow>
            </el-row>
        </el-main>
        <el-footer class="footer">
            <el-pagination
              class="pager"
              :page-size="20"
              layout="prev, pager, next"
              :total="1000">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<style scoped>
.pager {
  margin: 30px;
}
.pager > ui > li {
  font-size: 20px;
}
.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>

<script>
import SearchBox from "~/components/SearchBox";
import NavTop from "~/components/NavTop";
import ItemRow from "~/components/search/ItemRow";
export default {
  mounted() {
    console.log(this.$route.query);
    this.text = this.$route.query.text;
    this.tag = this.$route.query.tag;
    this.doSearch();
  },
  components: {
    SearchBox,
    NavTop,
    ItemRow
  },
  data() {
    return {
      text: "",
      tag: ["全部"],
      itemList: [
        
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
  },
  methods: {
    async doSearch() {
      let data = {
        query: "search",
        data: {
          itemTitle: this.text,
          bookCategory: this.tag
        }
      };
      let response = await this.$axios.send(data);
      this.itemList = response.data.item_list;
    }
  }
};
</script>
