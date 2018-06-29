<template>
    <div>
        <NavBar ref='navtop' :logined='logined' :user='user'></NavBar>
        <el-col :span="5">
            <NavLeft :active='currentMainIndex' @changeTab='changeTab'></NavLeft>
        </el-col>
        <component @changeName='changeName' :is="currentMain" :user='user' ></component>
    </div>
</template>

<script>
import NavBar from "~/components/NavTop";
import NavLeft from "~/components/home/NavLeft";
import Person from "~/components/home/Person";
import Transaction from "~/components/home/Transaction";
import AddGoods from "~/components/home/AddGoods";
import addressBook from "~/components/home/addressBook";
import AfterService from "~/components/home/AfterService";
import ApplyReturn from "~/components/home/ApplyReturn";
import ItemManage from "~/components/home/ItemManage";
import Cookies from "js-cookie";

export default {
  components: {
    NavBar,
    NavLeft,
    Person,
    Transaction,
    AddGoods,
    addressBook,
    ItemManage,
    AfterService,
    ApplyReturn
  },
  async mounted() {
    
    let userId = Cookies.get("userId");
    let sessionId = Cookies.get("sessionId");
    if (userId && sessionId) {
        let data = {
        query: "check",
        data: {
            userId: userId,
            sessionId: sessionId
        }
        };
        let check = await this.$axios.send(data);
        if (check.status != 1) {
            this.$message.error("操作失败!请重新登录");
            Cookies.remove("name");
            Cookies.remove("userId");
            Cookies.remove("sessionId");
            this.login = false;
            this.user = {};
            this.$router.push({ path: "/" });
        } 
    }
    let query = this.$route.query;
    this.changeTab(query['index'],[query['index']])
    // console.log(this.$route.query);
  },
  data() {
    return {
      type: 1,
      logined: true,
      currentMain: "Person",
      currentMainIndex:'1',
      user: {
        name: "张三"
      }
    };
  },
  methods: {
    changeTab(index, indexPath) {
      // console.log(index, indexPath);
      let name = {
        '1':"Person",
        '2':"addressBook",
        '3-1':"Transaction",
        '3-2':"Transaction",
        '4-2':"ItemManage",
        '5':"Message",
        '4-1':"AddGoods",
        '3-3':"AfterService",
        '3-4':'ApplyReturn'
      };
      this.currentMain = name[index];
      this.currentMainIndex = index;
      let userId = Cookies.get('userId')
      this.$router.push({ path: `/home/${userId}` ,query:{index:index}});
    },
    changeName(newName){
      // console.log('index')
      this.$refs.navtop.$emit('changeName',newName)
    }
  }
};
</script>
