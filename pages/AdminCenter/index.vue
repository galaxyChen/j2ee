<template>
    <div>
        <AdminNavTop></AdminNavTop>
        <el-col :span="5">
            <AdminNavLeft :active='currentMainIndex' @changeTab='changeTab'></AdminNavLeft>
        </el-col>
        <component :is="currentMain"></component>
    </div>    

</template>
<script>
import AdminNavTop from "~/components/AdminCenter/AdminNavTop"
import AdminNavLeft from "~/components/AdminCenter/AdminNavLeft"
import DealComplain from "~/components/AdminCenter/DealComplain"
export default {
    components: {
        AdminNavTop,
        AdminNavLeft,
        DealComplain
    },
    async mounted(){

    },
    data(){
        return {
            currentMain:'DealComplain',
            currentMainIndex: '1',
        }
    },
    methods: {
        changeTab(index, indexPath) {
        // console.log(index, indexPath);
        let name = {
            '1':"DealComplain",
        };
        this.currentMain = name[index];
        this.currentMainIndex = index;
        let adminId = Cookies.get('AdminId')
        // this.$router.push({ path: `/home/${userId}` ,query:{index:index}});
    },
  }  
};
</script>
