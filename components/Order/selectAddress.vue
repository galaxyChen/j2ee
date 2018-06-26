<template>
<el-dialog  title="选择收货地址" :visible.sync="visible"  @closed='closeDialog'  width="30%">
    <el-card v-for="(item,index) in addressList" :key="index" class="text item">
         
        <div ref="card" v-if="index!=currentIndex" class="leftCard" @click="handleSelect(index)">
        <div class="cardItem">
            收货人：{{item.recipientName}}
        </div>
        <div class="cardItem">
            联系方式：{{item.phoneNumber}}
        </div>
        <div class="cardItem">
            收货地址：{{ item.province+' '+item.city+' '+ item.addressDetail}}
        </div>
        </div>

        <div ref="card" v-if="index==currentIndex" class="selectCard" @click="handleSelect(index)">
        <div class="cardItem">
            收货人：{{item.recipientName}}
        </div>
        <div class="cardItem">
            联系方式：{{item.phoneNumber}}
        </div>
        <div class="cardItem">
            收货地址：{{ item.province+' '+item.city+' '+ item.addressDetail}}
        </div>
        </div>
        <span v-if="index==defaultIndex" >[默认地址]</span>
      </el-card>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
</el-dialog>



</template>


<style scope>
.selectCard {
    border: red;
    color :red
}
</style>


<script>
export default {
    props:["addressList","defaultIndex"],
    mounted() {
        this.$on("openDialog", function() {
            this.visible = true;
        });
        this.$on("closeDialog", function() {
            this.visible = false;
        });
    },
    data(){
        return {
            currentIndex : -1   ,
            visible :false     
        }
    },
    methods:{
        handleSelect(index){
        //    console.log(this.$refs.card[index])
           this.currentIndex = index
        },
        closeDialog() {
            this.currentIndex = -1
        },
        submit(){
            this.$emit('submitSelect',this.currentIndex)
            this.visible = false
        }
    }
}   
</script>
