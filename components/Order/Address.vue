<template>
<div>
    <el-card shadow="hover">
        <!-- 操作地址的三个弹窗 -->
        <editAddress ref="editAddress" :index="index" :item="addressItem"  @submitForm="editAddressItem"></editAddress>
        <addAddress ref='addAddress' @submitForm="addAddressItem" ></addAddress>
        <selectAddress ref='selectAddress' :defaultIndex="defaultIndex"  :addressList="addressList" @submitSelect="changeSelectAdress" ></selectAddress>
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
import selectAddress from "~/components/Order/selectAddress";
import Cookies from 'js-cookie'
export default {
    components: {
        addAddress,
        editAddress,
        selectAddress
    },
    async mounted() {
        await this.getAddress();

        if(this.addressList.length>0)
            this.addressItem = this.addressList[this.defaultIndex]
    },
    watch: {
        addressItem(){
            this.$emit('changeAddress',this.addressItem)
        },
        addressList(){
            for(let i=0;i< this.addressList.length;i++){
                if(this.addressList[i].isDefaultAddress)
                    this.defaultIndex = i;
            }
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
                city:'',
                addressId:'',
            },
            index : 0,
            defaultIndex : 0,
            nowIndex : 0,
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
        async editAddressItem(index,addressItem){
            // 编辑地址的组件 会发回一个 index,addressItem 。这里可以无视这个index值
            console.log(addressItem)
            let data = {
                query : "editAddress",
                data : {
                    userId : Cookies.get('userId'),
                    sessionId : Cookies.get('sessionId'),
                    recipientName : addressItem.recipientName,
                    phoneNumber : addressItem.phoneNumber,
                    addressDetail : addressItem.addressDetail,
                    province : addressItem.province,
                    city : addressItem.city,
                    isDefaultAddress : addressItem.isDefaultAddress+"",
                    addressId : addressItem.addressId+""
                }
            }
            
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.addressList =  response.data.addresses
                
                this.addressItem = addressItem 
            }
            else{
                this.$message.error('发生错误：'+response.err);
            }

        },
        async addAddressItem(addressItem){
             
            let data = {
                query : "addAddress",
                data : {
                    userId : Cookies.get('userId'),
                    sessionId : Cookies.get('sessionId'),
                    recipientName : addressItem.recipientName,
                    phoneNumber : addressItem.phoneNumber+"",
                    addressDetail : addressItem.addressDetail,
                    province : addressItem.province,
                    city : addressItem.city
                }
            }
            console.log(data)
            let response = await this.$axios.send(data)
            if(response.status===1){
                this.addressList =  response.data.addresses
                this.addressItem = addressItem
            }
            else{
                this.$message.error('发生错误：'+response.err);
            }
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