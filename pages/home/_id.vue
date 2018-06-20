<template>
    <div>
        <NavBar ref='navtop' :logined='logined' :user='user'></NavBar>
        <el-col :span="5">
            <NavLeft @changeTab='changeTab'></NavLeft>
        </el-col>
        <component @changeName='changeName' :is="currentMain" :user='user' :type='type'></component>
    </div>
</template>

<script>
import NavBar from "~/components/NavTop";
import NavLeft from "~/components/home/NavLeft";
import Person from "~/components/home/Person";
import Transaction from "~/components/home/Transaction";
import AddGoods from "~/components/home/AddGoods";
import addressBook from "~/components/home/addressBook";
import Cookies from "js-cookie";
export default {
  components: {
    NavBar,
    NavLeft,
    Person,
    Transaction,
    AddGoods,
    addressBook
  },
  async mounted() {
    let user_id = Cookies.get("user_id");
    let session_id = Cookies.get("session_id");
    if (user_id && session_id) {
        let data = {
        query: "check",
        data: {
            user_id: user_id,
            session_id: session_id
        }
        };
        let check = await this.$axios.send(data);
        if (check.status != 1) {
            this.$message.error("操作失败!请重新登录");
            Cookies.remove("name");
            Cookies.remove("user_id");
            Cookies.remove("session_id");
            this.login = false;
            this.user = {};
            this.$router.push({ path: "/" });
        } 
    }
    // console.log(this.$route.params);
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
      let name = [
        "Person",
        "addressBook",
        "Transaction",
        "Message",
        "AddGoods"
      ];
      this.currentMain = name[indexPath[0] - 1];
      if (index === "3-1") this.type = 1;
      if (index === "3-2") this.type = 2;
    },
    changeName(){
      this.$refs.navtop.$emit('changeName')
    }
  }
};
</script>
