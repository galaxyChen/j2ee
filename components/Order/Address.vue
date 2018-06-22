<template>
<div>
    <el-card shadow="hover">
        <!-- 操作地址的三个弹窗 -->
        <editAddress ref="editAddress" :index="index" :item="addressItem"  @submitForm="editAddressItem"></editAddress>
        <addAddress ref='addAddress' @submitForm="addAddressItem" ></addAddress>
        <selectAddress ref='selectAddress' :addressList="addressList" @submitSelect="changeSelectAdress" ></selectAddress>
        <!-- 显示信息 -->
        <el-row :gutter="20">
            <el-col :span="14">
                <div>
                    收货人：{{addressItem.recipientName}}
                </div>
                <div >
                    联系方式：{{addressItem.phoneNumber}}
                </div>
                <div >
                    收货地址：{{addressItem.province+' '+addressItem.city+' '+ addressItem.addressDetail}}
                </div>
            </el-col>
            <el-col :span='4'>
                <div>
                    <el-button @click="applyEditAddress(index)" type="text">修改地址</el-button>
                </div>
            </el-col>

            <el-col :span='6'>
                <el-button type="text" @click="applySelectAddress">选择地址</el-button>
                <el-button type="text" @click="applyAddAddress">新建地址</el-button>
            </el-col>

        </el-row>

        

    </el-card >
</div>
</template>

<script>
import editAddress from "~/components/home/editAddress";
import addAddress from "~/components/home/addAddress";
import selectAddress from "~/components/order/selectAddress";
import Cookies from 'js-cookie'
export default {
    components: {
        addAddress,
        editAddress,
        selectAddress
    },
    async mounted() {
        await this.getAddress();
        let defaultIndex = 0
        this.addressItem = this.addressList[defaultIndex]
    },
    watch: {
        addressItem(){
            this.$emit('changeAddress',this.addressItem)
        }
    },
    data() {
        return{
            addressList :[],
            addressItem:{
                recipientName:'',
                phoneNumber:'',
                addressDetail:'',
                province:'',
                city:''
            },
            index : 0
        }
    },
    methods:{

        applyEditAddress(index) {
            this.$refs.editAddress.$emit("openDialog");
        },
        applyAddAddress() {
            this.$refs.addAddress.$emit("openDialog");
        },
        applySelectAddress() {
            this.$refs.selectAddress.$emit("openDialog");
        },
        editAddressItem(index,addressItem){
            // 编辑地址的组件 会发回一个 index,addressItem 。这里可以无视这个index值
            this.addressItem = addressItem
        },
        addAddressItem(val){
            console.log(val)
        },
        changeSelectAdress(index){
            this.addressItem = this.addressList[index]
        },
        async getAddress(){


            let data = {
                query : "getAddress",
                data : {
                    userId : Cookies.get('userId'),
                    sessionId : Cookies.get('sessionId')
                }
            }
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.addressList =  response.data.addresses
            }
            else{
                this.$message.error('发生错误：'+response.err);
            }

        }
    }
}
</script>