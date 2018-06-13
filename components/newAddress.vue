<template>
    <el-dialog title="添加收货地址" :visible.sync="visible" width="30%">
        <el-form v-model="newAddressForm" ref="newAddressForm">

            <el-form-item label="姓名">
                <el-input v-model="newAddressForm.usn"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="newAddressForm.contact"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="newAddressForm.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">确定</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
<script>

export default {

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
            newAddressForm:{
                usn:'',
                contact:'',
                address:'',
                address1:''
            }
        };
    },
    methods: {
        resetForm() {
        
        },
        submitForm() {
            let newAddress = {
                usn : this.newAddressForm.usn,
                contact: this.newAddressForm.contact,
                address:this.newAddressForm.address
            }
            this.visible = false;
            this.$emit('submitForm',newAddress)
        }
    }
};
</script>