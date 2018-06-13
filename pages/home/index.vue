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
export default {
  components: {
    NavBar,
    NavLeft,
    Person,
    Transaction
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
      let name = ["Person", "Location", "Transaction", "Message"];
      this.currentMain = name[indexPath[0] - 1];
      if (index === "3-1") this.type = 1;
      if (index === "3-2") this.type = 2;
    }
  }
};
</script>
