<template>
    <div>
        <NavBar :logined='logined' :user='user'></NavBar>
        <el-col :span="5">
            <NavLeft @changeTab='changeTab'></NavLeft>
        </el-col>
        <component  :is="currentMain" :user='user' :type='type'></component>
    </div>
</template>

<script>
import NavBar from "~/components/NavTop";
import NavLeft from "~/components/home/NavLeft";
import Person from "~/components/home/Person";
import Transaction from "~/components/home/Transaction";
import AddGoods from"~/components/home/AddGoods"
import addressBook from '~/components/home/addressBook'
export default {
  components: {
    NavBar,
    NavLeft,
    Person,
    Transaction,
    AddGoods,
    addressBook
  },
  mounted(){
    console.log(this.$route.params)
  },
  data() {
    return {
      type: 1,
      logined: true,
      currentMain: "Person",
      user: {
        name: "张三"
      }
    };
  },
  methods: {
    changeTab(index, indexPath) {
      console.log(index, indexPath);
      let name = ["Person", "addressBook", "Transaction", "Message",'AddGoods'];
      this.currentMain = name[indexPath[0] - 1];
      if (index === "3-1") this.type = 1;
      if (index === "3-2") this.type = 2;
    }
  },

};
</script>
