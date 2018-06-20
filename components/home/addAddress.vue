<template>
    <el-dialog title="添加收货地址" :visible.sync="visible"  @closed='closeDialog'  width="30%">

        <el-form status-icon :model="addressItem" ref="addressItem" :rules="addressRule">

            <el-form-item label="姓名" prop="recipentName">
                <el-input @input='check("recipentName")' v-model="addressItem.recipentName" ></el-input>
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
                recipentName:'',
                phoneNumber:'',
                addressDetail:'',
                area:''
            },
            addressRule:{
                recipentName: [
                    { required: true, message: "收货人不能为空", trigger: "blur" },
                    { min: 1, max: 16, message: "长度小于16个字符", trigger: "blur" }
                ],
                phoneNumber:[
                    { validator:validPhone , message:"请输入正确的手机号",trigger:"blur" }
                ],
                addressDetail:[
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

            this.$refs['addressItem'].validate(async valid => {
        
                if (valid) {
                    let newAddress = {
                        recipentName : this.addressItem.recipentName,
                        phoneNumber: this.addressItem.phoneNumber,
                        addressDetail: this.addressItem.area+this.addressItem.addressDetail
                    }
                    this.visible = false;
                    this.$emit('submitForm',newAddress)
                }
                else{
                    console.log("error");
                }

            });


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