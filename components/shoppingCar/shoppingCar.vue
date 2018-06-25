<template>
<div>
  <el-table ref="Table" :data="tableData"  style="width: 100%" @selection-change="handleSelectionChange"  >
    <el-table-column type="selection"  >
        <template slot-scope="scope">
            <el-checkbox v-model="scope.row.chosen"  @change="selectChange(scope.$index)"></el-checkbox>
        </template>
    </el-table-column>
    <el-table-column label="商品信息" align="center">
        <template slot-scope="scope">
            <p>{{scope.row.title}}</p>
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
import Cookies from "js-cookie";
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
            // 判断是否库存为0 或者 下架了
            if(this.tableData[index].canChosen ){
              this.$refs.Table.toggleRowSelection(this.tableData[index])
              this.updateTotal()
            }
            else{
              this.tableData[index].chosen = false
              this.$message('商品库存不足或已下架')
            }

        },
        handleSelectionChange(val){
            if(val.length==0){
              this.tableData.forEach(element => {
                element.chosen = false
              });
            }
            else if(val.length==this.tableData.length){
              // this.tableData.forEach(element => {
              //   element.chosen = true
              // });
              for(let i =0;i<this.tableData.length;i++){
                if(this.tableData[i].canChosen){
                  this.tableData[i].chosen = true
                }
                else{
                  this.$refs.Table.toggleRowSelection(this.tableData[i])
                }
              }

            }
            this.updateTotal()
        },
        deleteItem(index){
          this.$confirm( '商品将从购物车中移除，是否继续？' ,'提示' ,{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then( async ()=>{


            //发送给后台 删除了那一项
            let data = {
              query : "deleteItemFromCar",
              data : {
                userId : Cookies.get('userId'),
                sessionId : Cookies.get('sessionId'),
                itemId : this.tableData[index].itemId,
              }
            }
            let response = await this.$axios.send(data)
            if(response.status===1){
              
            }
            else{
              this.$message.error('发生错误：'+response.err);
            }
            //////

            this.tableData.splice(index,1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            
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
                userId : Cookies.get('userId'),
                sessionId : Cookies.get('sessionId'),
            }
          }
          let response = await this.$axios.send(data)
          if(response.status===1){
            let tmp =  response.data.shoppingCarList
            tmp.forEach(element => {
              element.chosen = false;
              if(element.quantity>0 && element.itemState==1){
                element.canChosen = true;
              }
              else{
                element.canChosen = false;
              }
            });
            this.tableData = tmp;
            
          }
          else{
            this.$message.error('发生错误：'+response.err);
          }
        },
        async submitBill(){

          let userId = Cookies.get("userId");
          let sessionId = Cookies.get("sessionId");
          if (userId && sessionId) {
            let data = {
              query: "check",
              data: {
                userId: userId,
                sessionId: sessionId
              }
            };
            let check = await this.$axios.send(data);
            if (check.status == 1) {
              this.updateTotal()
              
              let toBuyList = []
              this.tableData.forEach(ele =>{
                if(ele.chosen==true){
                  let newItem = {
                    price : ele.price,
                    nums : ele.nums,
                    title : ele.title,
                    province : ele.province
                  }
                  toBuyList.push(newItem)
                }
              });

              
              Cookies.set("itemList", toBuyList);
              this.$router.push({ path: `/order/${userId}` });
            } else {
              this.signout()
            }
          }
        },

    }
  }
</script>