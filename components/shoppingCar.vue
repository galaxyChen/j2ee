<template>
<div>
  <el-table :data="tableData"  style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column type="selection" label="全选" prop="check">
    </el-table-column>
    <el-table-column label="商品信息" align="center">
        <template slot-scope="scope">
            <p>{{scope.row.information}}</p>
        </template>
    </el-table-column>
    <el-table-column label="单价" align="center">
        <template slot-scope="scope">
            <p>￥{{scope.row.price}}</p>
        </template>
    </el-table-column>
    <el-table-column label="数量" align="center" @change="handleChange">
        <template slot-scope="scope">
            <el-input-number  v-model="scope.row.nums"  :min="1" :max="10" label="描述文字"></el-input-number>
        </template>
    </el-table-column>
    <el-table-column label="小计" align="center">
        <template slot-scope="scope">
            <p style="color:red">￥{{scope.row.price*scope.row.nums}}</p>
        </template>
    </el-table-column>
    <el-table-column  label="操作" align="center">
      <template slot-scope="scope">
        <el-button  type="text" size="small">移入收藏夹</el-button>
        <el-button type="text" @click="deleteItem(scope.$index)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="bottomTap">
    <span class="bottomLeftTap">
      <span :model="tableData" >
          共{{tableData.length}}件商品，
      </span>
      <span :model="selectionList" >
          已选择{{selectionList.length}}件 |
      </span>
      <span :model="totalPay" >
        应付总额：￥{{totalPay}}
      </span> 
    </span>
    <el-button type="primary"  v-on:click="submitBill">下单结算</el-button> 
  </div>

</div>  
</template>

<style>
.bottomTap{
  margin-top: 20px
}
.bottomLeftTap{
  width: 70%
}
</style>


<script>
  export default {
    data() {
      return {
        tableData: [{
          information:'bb',
          price: 518,
          nums:1,
          check:false
        }, {
          information:'bb',
          price: 518,
          nums:1,
          check:false
        }, {
          information:'bb',
          price: 518,
          nums:0,
          check:false
        }, {
          information:'bb',
          price: 518,
          nums:0,
          check:false
        }],
        selectionList :[],
        totalPay:0
      }
    },
    methods:{
        handleChange(value) {
            console.log(value);
        },
        submitBill(){
            console.log(this.tableData)
        },
        handleSelectionChange(val){
          this.selectionList = val
          this.totalPay = 0
          for(let item of val){
            console.log(item)
            this.totalPay += item.price*item.nums
          }
        },
        deleteItem(index){
          this.tableData.splice(index,1)
        }

    }
  }
</script>