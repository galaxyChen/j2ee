<template>
  <el-table ref="Table" :data="itemList"  class="el-table1"  >

    <el-table-column label="商品信息" align="center">
        <template slot-scope="scope">
            <p>{{scope.row.itemTitle}}</p>
        </template>
    </el-table-column>

    <el-table-column label="发货地" align="center">
        <template slot-scope="scope">
            <p>{{scope.row.province}}</p>
        </template>
    </el-table-column>
    <el-table-column label="单价" align="center">
        <template slot-scope="scope">
            <p>￥{{scope.row.price}}</p>
        </template>
    </el-table-column>
    <el-table-column label="数量" align="center">
        <template slot-scope="scope">
            <p>{{scope.row.nums}}</p>
        </template>
    </el-table-column>
    <el-table-column label="运费" align="center">
        <template slot-scope="scope">
            <p>{{scope.row.postage}}</p>
        </template>
    </el-table-column>
    <el-table-column label="小计" align="center">
        <template slot-scope="scope">
            <p style="color:red">￥{{ ( scope.row.price*scope.row.nums+scope.row.postage-0 ).toFixed(2) }}</p>
        </template>
    </el-table-column>


  </el-table>
</template>

<style scope>
.el-table1{

  width: 100%;

}
</style>
<script>
export default {
    mounted(){
        
    },

    props: [ 
        "itemList"
    ],

}
</script>
