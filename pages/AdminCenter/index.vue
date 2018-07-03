<template>
    <div>
        <AdminNavTop></AdminNavTop>
        <el-row>
        <el-col :span="5">
            <AdminNavLeft :active='currentMainIndex' @changeTab='changeTab'></AdminNavLeft>
        </el-col>
        <!-- <component :is="currentMain"></component> -->
        <el-col :span="18">
            <ComplainDetail></ComplainDetail>

        </el-col>

        </el-row>

        
    </div>    

</template>
<script>
import AdminNavTop from "~/components/AdminCenter/AdminNavTop"
import AdminNavLeft from "~/components/AdminCenter/AdminNavLeft"
import DealComplain from "~/components/AdminCenter/DealComplain"
import ComplainDetail from "~/components/AdminCenter/ComplainDetail"
export default {
    components: {
        AdminNavTop,
        AdminNavLeft,
        DealComplain,
        ComplainDetail
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
