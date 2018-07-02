<template>
    <el-container>
        <el-main>

        
        <el-tabs v-model="service" >
            <el-tab-pane name="seeList" label="查看售后申请列表">
                <el-card v-for="(item,index) in afterServiceList" :key="index">
                    <div>
                        <el-row class="header">
                            <el-col class="header-text" :span="4">下单时间:{{item.purchaseTime}}</el-col>
                            <el-col class="header-text" :span="4"> 订单编号:{{item.orderId}} </el-col>
                        </el-row>
                        <el-row class="el-row-body">
                            <el-col :span="4" class="el-row-body-text"><img :src="item.pictureAddress"/> </el-col>
                            <el-col :span="4" class="el-row-body-text">{{item.itemTitle}}</el-col>
                            <el-col :span="4" class="el-row-body-text">
                                <el-row style="margin-bottom:20px">服务单号:{{item.afterServiceId}}</el-row>
                                <el-row>申请时间:{{item.launchTime}}</el-row>
                            </el-col>
                            <el-col :span="5" class="el-row-body-text">
                                <el-row style="margin-bottom:20px">买家申诉信息</el-row>
                                <el-row>卖家申诉信息</el-row>
                            </el-col>
                            <el-col :span="4" class="el-row-body-text">
                                <el-button v-if="item.afterServiceState==0" @click="seeDetail(index)">审核</el-button>
                                <el-button v-if="item.afterServiceState==1" @click="seeDetail(index)">查看详情</el-button>
                                <el-button v-if="item.afterServiceState==2" @click="seeDetail(index)">售后收货</el-button>
                            </el-col>
                        </el-row>


                    </div>
                </el-card>

            </el-tab-pane>
        </el-tabs>

        </el-main>
    </el-container>

</template>

<style scoped>


.header {
  background-color: rgb(249, 249, 249);
  /* height: 40px; */
}
.header-text {
  line-height: 30px;
  margin: 5px 0 5px 10px;
}
.el-row-body {
    margin-top: 15px;
}
.el-row-body-text {
    margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
}
</style>


<script>
export default {
    data() {
        return {
            service : 'seeList',
            afterServiceList :[
                {
                    afterServiceId : 123,
                    launchTime : '2018-6-28',
                    returnReason : '图书图片不符',
                    totalPrice : '20.5',
                    description : '买的时候网上看的图书封面是蓝色，买下来发现是红色',
                    buyerName : 'lwz',
                    phoneNumber : '13631433767',
                    purchaseTime : '2018-6-27',
                    orderId : '312',
                    pictureAddress : '2' , 
                    afterServiceState : '0',
                    itemTitle : '10001个为什么'
                },
                {
                    afterServiceId : 163,
                    launchTime : '2018-6-28',
                    returnReason : '图书价格不符',
                    totalPrice : '20.5',
                    description : '买的时候说要10块，结果收我20块',
                    buyerName : 'lwz',
                    phoneNumber : '13631433767',
                    purchaseTime : '2018-6-27',
                    orderId : '356',
                    pictureAddress : '1' , 
                    afterServiceState : '1',
                    itemTitle : '10001个为什么'
                }
            ]
        }
    },
    methods:{
        seeDetail(index){

        }
    }
}
</script>
