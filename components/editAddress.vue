<template>
    <el-dialog title="修改收货地址" :visible.sync="visible" width="30%">
        <el-form v-model="addressItem" ref="addressItem">

            <el-form-item label="姓名">
                <el-input v-model="addressItem.usn"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="addressItem.contact"></el-input>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="addressItem.address"></el-input>
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

    props:["index"],
    mounted() {
        this.$on("openDialog", function() {
            console.log(this.index)
            this.visible = true;
        });
        this.$on("closeDialog", function() {
            this.visible = false;
        });
    },
    data() {
        return {
            visible: false,

            addressItem:{
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
                usn : this.addressItem.usn,
                contact: this.addressItem.contact,
                address:this.addressItem.address
            }
            this.visible = false;
            this.$emit('submitForm',newAddress)
        }
    }
};
</script>