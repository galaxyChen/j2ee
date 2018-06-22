<template>
<div>
  <el-table ref="Table" :data="tableData"  style="width: 100%" @selection-change="handleSelectionChange"  >
    <el-table-column type="selection"  >
        <template slot-scope="scope">
            <el-checkbox v-model="scope.row.chosen" @change="selectChange(scope.$index)"></el-checkbox>
        </template>
    </el-table-column>
    <el-table-column label="商品信息" align="center">
        <template slot-scope="scope">
            <p>{{scope.row.information}}</p>
        </template>
    </el-table-column>
    <el-table-column label="库存" align="center">
      <template slot-scope="scope">
          <p>{{scope.row.quantity}}</p>
      </template>
    </el-table-column>
    <el-table-column label="单价" align="center">
        <template slot-scope="scope">
            <p>￥{{scope.row.price}}</p>
        </template>
    </el-table-column>
    <el-table-column label="数量" align="center">
        <template slot-scope="scope">
            <el-input-number  v-model="scope.row.nums"  :min="1" :max="scope.row.quantity" @change="changeNums"></el-input-number>
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
          已选择<span :model="chosenNum" style="color:red">{{chosenNum}}</span>件 |
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
    mounted(){
      this.getShoppingCarList();
    },
    data() {
      return {
        tableData: [],
        chosenNum :0,
        totalPay:0
      }
    },
    methods:{

        selectChange(index){
            this.$refs.Table.toggleRowSelection(this.tableData[index])
            this.updateTotal()
        },
        handleSelectionChange(val){
            if(val.length==0){
              this.tableData.forEach(element => {
                element.chosen = false
              });
            }
            else if(val.length==this.tableData.length){
              this.tableData.forEach(element => {
                element.chosen = true
              });
            }
            this.updateTotal()
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
            this.updateTotal()

          }).catch( ()=>{
            this.$message({
            type: 'info',
            message: '已取消删除'
          });   
          })

        },
        changeNums(){
          this.updateTotal()
        },
        updateTotal(){
          let tmp = 0
          let tmp1 = 0
          this.tableData.forEach(element => {

            if(element.chosen==true){
                tmp += element.price * element.nums
                tmp1 += element.nums
              }
            });
          this.totalPay = tmp
          this.chosenNum = tmp1
        },
        async getShoppingCarList(){
          let data = {
            query : "getShoppingCarList",
            data : {
              userId : '',
              sessionId : ''
            }
          }
          let response = await this.$axios.send(data)
          if(response.status===1){
            let tmp =  response.data.shoppingCarList
            tmp.forEach(element => {
              element.chosen = false
            });
            this.tableData = tmp;
            
          }
          else{
            this.$message.error('发生错误：'+response.err);
          }
        },
        submitBill(){
          this.updateTotal()
          console.log(this.tableData)
           this.$router.push({ path: `/Pay/` });
        },

    }
  }
</script>