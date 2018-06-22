<template>
<div>
    <el-card shadow="hover">
        <!-- 修改地址弹窗 -->
        <editAddress ref="editAddress" :index="index" :item="addressItem"  @submitForm="editAddressItem"></editAddress>
        <addAddress ref='addAddress' @submitForm="addAddressItem" ></addAddress>
        <selectAddress ref='selectAddress' :addressList="addressList" @submitSelect="changeSelectAdress" ></selectAddress>
        <!-- 左侧信息 -->
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
export default {
    components: {
        addAddress,
        editAddress,
        selectAddress
    },
    props: ['addressList'],
    mounted() {
        let defaultIndex = 0
        this.addressItem.recipientName = this.addressList[defaultIndex].recipientName
        this.addressItem.phoneNumber = this.addressList[defaultIndex].phoneNumber
        this.addressItem.addressDetail = this.addressList[defaultIndex].addressDetail
        this.addressItem.province = this.addressList[defaultIndex].province
        this.addressItem.city = this.addressList[defaultIndex].city

    },
    data() {
        return{

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
        editAddressItem(index,val){
            console.log(val)
        },
        addAddressItem(val){
            console.log(val)
        },
        changeSelectAdress(index){
            this.addressItem.recipientName = this.addressList[index].recipientName
            this.addressItem.phoneNumber = this.addressList[index].phoneNumber
            this.addressItem.addressDetail = this.addressList[index].addressDetail
            this.addressItem.province = this.addressList[index].province
            this.addressItem.city = this.addressList[index].city
        }
    }
}
</script>