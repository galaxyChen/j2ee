<template>
    <el-dialog title="添加收货地址" :visible.sync="visible"  width="30%">

        <el-form status-icon :model="addAddressForm" ref="addAddressForm" :rules="addressRule">

            <el-form-item label="姓名" prop="usn">
                <el-input v-model="addAddressForm.usn" ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="contact">
                <el-input v-model="addAddressForm.contact"></el-input>
            </el-form-item>

            <mapLinkage @updateArea="updateArea"></mapLinkage>

            <el-form-item label="详细地址" prop="address"> 
                <el-input v-model="addAddressForm.address"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
<script>
import mapLinkage from '~/components/mapLinkage'
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
        return {
            visible: false,
            addAddressForm:{
                usn:'',
                contact:'',
                address:'',
                area:''
            },
            addressRule:{
                usn: [
                    { required: true, message: "收货人不能为空", trigger: "blur" },
                    { min: 1, max: 16, message: "长度小于16个字符", trigger: "blur" }
                ],
                contact:[
                    { required: true, message: "联系方式不能为空", trigger: "blur" },
                    { min: 8, max: 15, message: "长度在 8 到 15 个字符", trigger: "blur" }
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
            this.$refs['addAddressForm'].validateField(item);
        },
        resetForm() {
        
        },
        submitForm() {
            let newAddress = {
                usn : this.addAddressForm.usn,
                contact: this.addAddressForm.contact,
                address: this.addAddressForm.area+this.addAddressForm.address
            }
            this.visible = false;
            this.$emit('submitForm',newAddress)
        },
        updateArea(area){
            this.addAddressForm.area = area
        }
    }
};
</script>