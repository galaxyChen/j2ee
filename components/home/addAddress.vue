<template>
    <el-dialog title="添加收货地址" :visible.sync="visible"  @closed='closeDialog'  width="30%">

        <el-form status-icon :model="addressItem" ref="addressItem" :rules="addressRule">

            <el-form-item label="姓名" prop="recipientName">
                <el-input @input='check("recipientName")' v-model="addressItem.recipientName" ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNumber">
                <el-input  @input='check("phoneNumber")' v-model="addressItem.phoneNumber"></el-input>
            </el-form-item>
            
            <mapLinkage ref="map" @updateArea="updateArea"></mapLinkage>

            <el-form-item label="详细地址" prop="addressDetail"> 
                <el-input @input='check("addressDetail")'  v-model="addressItem.addressDetail"></el-input>
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
    mounted() {
        this.$on("openDialog", function() {
            this.visible = true;
        });
        this.$on("closeDialog", function() {
            this.visible = false;
        });
    },
    data() {
        var validPhone = (rule,value,callback)=>{
            if(value==""){
                callback(new Error("请输入手机号"));
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
                recipientName:'',
                phoneNumber:'',
                addressDetail:'',
                province:'',
                city:''
            },
            addressRule:{
                recipientName: [
                    { required: true, message: "收货人不能为空", trigger: "change" },
                    { min: 1, max: 16, message: "长度小于16个字符", trigger: "change" }
                ],
                phoneNumber:[
                    { validator:validPhone ,trigger:"change" }
                ],
                addressDetail:[
                    { required: true, message: "请输入详细地址", trigger: "change" },
                    { min: 1, max: 50, message: "长度不超过50个字符", trigger: "change" }
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
            this.$refs.map.reset()
        },
        submitForm() {
            let flag = this.$refs.map.test()
            this.$refs['addressItem'].validate(async valid => {
        
                if (valid && flag) {
                    
                    let newAddress = {
                        recipientName : this.addressItem.recipientName,
                        phoneNumber: this.addressItem.phoneNumber,
                        addressDetail: this.addressItem.addressDetail,
                        province : this.addressItem.province,
                        city :this.addressItem.city
                    }
                    this.visible = false;
                    this.$emit('submitForm',newAddress)
                }
                else{
                    console.log("error");
                }

            });


        },
        updateArea(province,city){
            this.addressItem.province = province
            this.addressItem.city = city
        },
        closeDialog() {
            this.$refs["addressItem"].resetFields();
            this.$refs.map.reset()
        }
    }
};
</script>