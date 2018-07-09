    <template>
    <!-- 卖家角度 查看申请售后服务商品的详细信息 -->
    <div style=" border-style: solid;border-color: rgb(238, 238, 238);">    
        <el-row class="row1 status" >
            <el-col :span="6" style="color:red">售后服务状态：{{afterSellerService.afterServiceState}}</el-col>
            <el-col :span="6" :offset="2">服务单号：{{afterSellerService.afterServiceId}}</el-col>
            <el-col :span="10"  >申请时间：{{afterSellerService.launchTime}}</el-col>
        </el-row>
        <div class="serviceMsg">
            <el-row class="row1">
                <h3 style="color:#cccccc;">服务单信息：</h3>
            </el-row>
            <div class="row1">
                <el-row class="msg"> 
                    <el-col :span="4" class="col-title">服务单号</el-col>
                    <el-col :span="20" class="col-text">{{afterSellerService.afterServiceId}}</el-col>      
                </el-row>
                <el-row class="msg"> 
                    <el-col :span="4" class="col-title">申请时间</el-col>
                    <el-col :span="20" class="col-text">{{afterSellerService.launchTime}}</el-col>      
                </el-row>
                <el-row class="msg"> 
                    <el-col :span="4" class="col-title">退货原因</el-col>
                    <el-col :span="20" class="col-text">{{afterSellerService.returnReason}}</el-col>      
                </el-row>
                <el-row class="msg">
                    <el-col :span="4" class="col-title">退款金额</el-col>
                    <el-col :span="20" class="col-text">￥{{afterSellerService.totalPrice}}</el-col>     
                </el-row>
                <el-row class="msg">
                    <el-col :span="4" class="col-title">联系人</el-col> 
                    <el-col :span="20" class="col-text">{{afterSellerService.buyerName}}</el-col>     
                </el-row>
                <el-row class="msg">
                    <el-col :span="4" class="col-title">联系电话</el-col>
                    <el-col :span="20" class="col-text">{{afterSellerService.buyerPhoneNumber}}</el-col>     
                </el-row>
            </div>
        </div>
        <el-row class="row1">
            <h3 style="color:#cccccc;">问题描述</h3>
            <div style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;margin-bottom:40px;padding:20px;">{{afterSellerService.description}}
            <!-- 加入照片凭证 -->
            <h5 style="color:#cccccc;margin-top:10px;margin-bottom:20px;">照片凭证：</h5>
            <div>
                <img :src="afterSellerService.pictureAddress">
            </div>
            </div>
        </el-row>

        <div class="check" v-if="ifShow(afterSellerService.afterServiceState)">
            <h3 style="color:#cccccc;">审核信息</h3>
            <div style="border-style:solid;border-color:rgb(238, 238, 238);margin-top:10px;padding:20px;line-height:25px;">
                <p style="margin-bottom:30px;">{{afterSellerService.sellerMessage}}</p>
                <el-row >收货地址： {{afterSellerService.addressDetail}}</el-row>
                <el-row >联系姓名： {{afterSellerService.sellerName}}</el-row>
                <el-row >联系电话：{{afterSellerService.sellerPhoneNumber}}</el-row>
            </div>
        </div>

        <!-- 未想好 点击取消之后，页面如何变化 -->
        <!-- <el-button type="primary" class="cancelBtn" @click="confirmCancel">取消</el-button> -->
    </div>
</template>

<style scope>
.cancelBtn{
    float:right;
    margin-top:30px;
}
.container{
    margin-top: 0px;
}
.col-title{
    text-align: center;
    background-color: rgb(249, 249, 249);
    border-style: solid;
    border-width: 1px;
    border-color: rgb(228, 228, 228);
    font-size: 18px;
}
.col-text{
    text-align: left;
    left : 80px;
    border-style: solid;
    border-width: 1px;
    border-color: rgb(228, 228, 228);
    padding-left: 20px;
}

.msg{
    margin-bottom: 3px;
    padding:1px;
}
.row1 {
    margin-bottom: 30px;
    /* margin-top: 30px;  */
}
.status{
    background-color: #eeebeb;
    width:100%;
    padding:20px;
    
}
</style>

<script>
export default {
    props:["afterSellerService"],
    methods:{
       confirmCancel() {
            this.$confirm('是否取消申请售后?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then( async () => {
            this.$message({
                type: 'success',
                message: '取消成功!'
            });
            
            // 接口未写
            // let response = await this.$send();
            }).catch(() => {
            this.$message({
                // type: 'info',
                // message: ''
            });          
            });
        },
        ifShow(state){
            console.log(state)
            if(state=='等待退货' || state=='等待售后收货' ||state=='售后已签收'||state=='完成售后'||state=='卖家申诉中')
                return true
            console.log("???")
            return false
        }
    }
}
</script>
