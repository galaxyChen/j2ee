<template>
    <el-dialog title="修改收货地址" :visible.sync="visible"  @closed='closeDialog'  width="30%">

        <el-form status-icon :model="addressItem" ref="addressItem" :rules="addressRule">

            <el-form-item label="姓名" prop="name">
                <el-input @input='check("name")' v-model="addressItem.name" ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input  @input='check("phone")' v-model="addressItem.phone"></el-input>
            </el-form-item>
            
            <mapLinkage ref="map" @updateArea="updateArea"></mapLinkage>

            <el-form-item label="详细地址" prop="address"> 
                <el-input @input='check("address")'  v-model="addressItem.address"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
<script>
import mapLinkage from '~/components/home/mapLinkage'
export default {
    components: {
        mapLinkage
    },
    props:["index","item"],
    mounted() {
        this.$on("openDialog", function() {
            //this.addressItem = this.oldAddressItem

            this.visible = true;

            this.addressItem.name = this.item.name
            this.addressItem.phone = this.item.phone
            this.addressItem.address = this.item.address
        });
        this.$on("closeDialog", function() {
            this.visible = false;
        });
    },
    data() {
        var validPhone = (rule,value,callback)=>{
            if(value==""){
                callback(new Error("联系方式不能为空"));
            }
            else{
                let p = /^1[3|4|5|7|8][0-9]\d{8}$/;
                if(!p.test(value)){
                    callback(new Error("请输入正确的手机号"));
                }
                else{
                    callback();
                }
            }
        };
        return {
            visible: false,

            addressItem:{
                name:'',
                phone:'',
                address:'',
                area:''
            },
            addressRule:{
                name: [
                    { required: true, message: "收货人不能为空", trigger: "blur" },
                    { min: 1, max: 16, message: "长度小于16个字符", trigger: "blur" }
                ],
                phone:[
                    { validator:validPhone , message:"请输入正确的手机号",trigger:"blur" }
                ],
                address:[
                    { required: true, message: "地址不能为空", trigger: "blur" },
                    { min: 1, max: 50, message: "长度小于50个字符", trigger: "blur" }
                ],
            }
        
        };
    },
    methods: {
        check(item){
            this.$refs['addressItem'].validateField(item);
        },
        resetForm() {
            this.$refs['addressItem'].resetFields()
            this.$refs.map.init()
        },
        submitForm() {
            let newAddress = {
                name : this.addressItem.name,
                phone: this.addressItem.phone,
                address:this.addressItem.area+this.addressItem.address
            }
            this.visible = false;
            this.$emit('submitForm',this.index,newAddress)
        },
        updateArea(area){
            this.addressItem.area = area
        },
        closeDialog() {
            this.$refs["addressItem"].resetFields();
            this.$refs.map.init()
        }
    }
};
</script>