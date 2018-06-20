<template>
<div>
  <el-table ref="Table" :data="tableData"  style="width: 100%" @selection-change="handleSelectionChange"  >
    <el-table-column type="selection"  prop="check">
        <template slot-scope="scope">
            <el-checkbox v-model="scope.row.check" @change="selectChange(scope.$index)"></el-checkbox>
        </template>
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
    <el-table-column label="数量" align="center">
        <template slot-scope="scope">
            <el-input-number  v-model="scope.row.nums"  :min="1" :max="10" @change="changeNums"></el-input-number>
        </template>
    </el-table-column>
    <el-table-column label="小计" align="center">
        <template slot-scope="scope">
            <p style="color:red">￥{{scope.row.price*scope.row.nums}}</p>
        </template>
    </el-table-column>

    <el-table-column  label="操作" align="center">
      <template slot-scope="scope">
        <el-button type="text" @click="deleteItem(scope.$index)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>



  <el-row class="el-row1">
    <el-col :span="17">
      <span >
          共<span :model="tableData" style="color:red" >{{tableData.length}}</span>件商品，
          已选择<span :model="selectionList" style="color:red">{{selectionList.length}}</span>件 |
          应付总额：￥<span :model="totalPay" style="color:red">{{totalPay}}</span>
      </span>
    </el-col>

    <el-col :span="4" :push="4">
      <el-button type="primary"  v-on:click="submitBill">下单结算</el-button> 
    </el-col>
  </el-row>


</div>  
</template>

<style scope>
.el-row1{
  margin-top: 30px
}

</style>


<script>
  export default {
    data() {
      return {
        tableData: [
          {
            information:'merlin',
            price: 518,
            nums:1,
            check:false,
            ID:0
          }, 
          {
            information:'lilith',
            price: 518,
            nums:1,
            check:false,
            ID:1
          }, 
          {
            information:'bb',
            price: 518,
            nums:1,
            check:false,
            ID:2
          }, 
          {
            information:'aa',
            price: 518,
            nums:1,
            check:false,
            ID:3
          }
        ],
        selectionList :[],
        totalPay:0
      }
    },
    methods:{
        submitBill(){
            this.updateTotalPay()
            console.log(this.tableData)
        },
        selectChange(index){
            this.$refs.Table.toggleRowSelection(this.tableData[index])
            this.updateTotalPay()
        },
        handleSelectionChange(val){
            if(val.length==0){
              this.tableData.forEach(element => {
                element.check = false
              });
            }
            else if(val.length==this.tableData.length){
              this.tableData.forEach(element => {
                element.check = true
              });
            }
            this.updateTotalPay()
        },
        deleteItem(index){
          this.$confirm( '商品将从购物车中移除，是否继续？' ,'提示' ,{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then( ()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            this.tableData.splice(index,1)
            this.updateTotalPay()

          }).catch( ()=>{
            this.$message({
            type: 'info',
            message: '已取消删除'
          });   
          })

        },
        changeNums(){
          this.updateTotalPay()
        },
        updateTotalPay(){
          let tmp = 0
          this.tableData.forEach(element => {

            if(element.check==true){
                tmp += element.price * element.nums
              }
            });
          this.totalPay = tmp
        }

    }
  }
</script>