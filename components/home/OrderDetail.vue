<template>
    <div>
        <el-row>
            <el-col :span='4'>
                <i class="el-icon-time state-icon">
                    
                </i>
                <p></p>
            </el-col>
            <el-col></el-col>
            <el-col></el-col>
            <el-col></el-col>
            <el-col></el-col>
        </el-row>
    </div>
</template>

<style scoped>
.state-icon{
    font-size: 80px;
}
</style>

<script>
export default {
    props:['order'],
    data(){
        return {}
    }
}
</script>
