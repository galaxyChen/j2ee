<template>
    <el-dialog title="修改收货地址" :visible.sync="visible" width="30%">
        <el-form v-model="addressItem" ref="addressItem">

            <el-form-item label="姓名">
                <el-input v-model="addressItem.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="addressItem.phone"></el-input>
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
        return {
            visible: false,

            addressItem:{
                name:'',
                phone:'',
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
                name : this.addressItem.name,
                phone: this.addressItem.phone,
                address:this.addressItem.address
            }
            this.visible = false;
            this.$emit('submitForm',this.index,newAddress)
        }
    }
};
</script>