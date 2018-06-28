<template>
    <el-container style="font-size:20px;">
        <el-main>
        <div class="Apply-box"> 
            <h1 style="margin-top:5px;margin-left:10px;">申请退货</h1>
            <div class="orderMsg">
                <!-- 订单信息部分 -->
                <el-row class="header">
                    <el-col class="header-text" :span='4'></el-col>
                    <el-col class="header-text" :span='4'>商品信息</el-col>
                    <el-col class="header-text" :span='4'>数量</el-col>
                    <el-col class="header-text" :span='6'>单价</el-col>
                    <el-col class="header-text" :span='4'>实付</el-col>
                </el-row>

                <el-row>
                    <el-col class='order-box' :span='4'>
                        <div >
                            <img class='order-book' :src='order.pictureAddress'/>
                        </div>
                    </el-col>
                    <el-col class='order-box' :span="4">
                        <h4 class="order-title-text">{{order.itemTitle}}</h4>
                    </el-col>
                    <el-col  class='order-box' :span="4">
                        <a class="order-title-text">{{order.quantity}}</a>
                    </el-col>
                    <el-col class='order-box' :span="6">
                        <a class="order-title-text">{{order.price}}</a>
                    </el-col>
                    <el-col  class='order-box' :span="6">
                        <a class="order-title-text">{{order.pay}}</a>
                    </el-col>
                </el-row>
            </div>
            <!-- 2、申请信息 -->
            <div class="ApplyMsg">
                <h3 style="color:#cccccc;"> 申请信息</h3>
                <div style="border-style:double;border-color:#CCCCCC;margin:10px 20px 30px 10px;">
                    <el-form :model="ApplyForm" :rules="rules" ref="ApplyForm" label-width="100px" >
                        <el-form-item label="退货原因: " style="margin-top:20px" prop="reason">
                                <el-select v-model="ApplyForm.reason" clearable placeholder="请选择退货原因">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        <el-row>
                            <!-- 记得添加验证。最多只能输入三百个字 -->
                            <el-form-item label="问题描述: " prop="dsc">
                                <el-col :span="14">
                                    <el-input v-model="ApplyForm.dsc"  type="textarea" :rows="4" placeholder="请输入问题描述，不超过三百字"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-row>
                        <el-form-item label="上传凭证：">
                            <el-upload class="upload-pic" 
                            action=""  
                            :show-file-list="true"
                            ref='upload'
                            :before-remove="beforeRemove" 
                            :limit="3"
                            :on-exceed="handleExceed"
                            :auto-upload="false"
                            list-type="picture">
                            <el-button slot='trigger' size="small" type="primary">选择文件</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M。最多可上传3张。</div>
                            </el-upload>
                        </el-form-item>
                            </el-form>
                </div>

                <!-- 3、联系人部分 -->
                <div class="ContactMsg">
                    <h3 style="color:#cccccc;"> 联系方式</h3>
                    <div style="border-style:double;border-color:#CCCCCC;margin:10px 20px 30px 10px;padding-top:20px;padding-left:30px;">
                        <el-form :model="ApplyForm" :rules="rules" ref="ApplyForm" label-width="100px" >
                            <el-row>
                                <el-form-item label="联系人: " prop="contacts">
                                    <el-col :span="8">
                                        <el-input v-model="ApplyForm.contacts" placeholder="请输入联系人"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                            <el-row>
                                <el-form-item label="联系电话: " prop="phone">
                                    <el-col :span="8">
                                        <el-input v-model="ApplyForm.phone" placeholder="请输入联系电话"></el-input>
                                    </el-col>
                                </el-form-item>
                            </el-row>
                        </el-form>    
                    </div>
                </div>

                <el-button type="primary" style="margin-left:43%;margin-top:30px;margin-bottom:30px;">确认提交</el-button>
            
                <!-- 4、温馨提示 -->
                <div class="tips-box">
                    <el-row>温馨提示：</el-row>
                    <el-row>• 商品寄回地址将在审核通过后以短信形式告知，或在申请记录中查询。</el-row>
                    <el-row>• 提交服务单后，售后专员可能与您电话沟通，请保持手机畅通。</el-row>
                    <el-row>• 退货处理成功后退款金额将原路返回到您的支持账户中；</el-row>
                </div>
            </div>
        </div>
        </el-main>
    </el-container>
</template>

<script>
import NavTop from "~/components/NavTop";
import NavLeft from "~/components/home/NavLeft";
export default {
  components: {
    NavTop,
    NavLeft
  },
  data() {
    var checkContacts = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入退货联系人的姓名"));
      } else if (value.length > 20) {
        callback(new Error("长度不超过20个字"));
      } else {
        let p = /^[0-9]*$/;
        if (p.test(value)) {
          callback(new Error("由汉字、字母和数字组成，不允许是纯数字"));
        }
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      let p = /^[0-9]*$/;
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!p.test(value)) {
        callback(new Error("电话号码仅能由数字组成"));
      } else if (value.length != 11) {
        callback(new Error("电话号码必须是11位"));
      } else {
        callback();
      }
    };

    return {
      order: {
        pictureAddress: "",
        itemTitle: "三体",
        quantity: 3,
        price: 30,
        pay: 90
      },
      ApplyForm: {
        reason: "",
        dsc: "",
        contacts: "",
        phone: ""
      },

      options: [
        {
          value: "选项1",
          label: "质量问题"
        },
        {
          value: "选项2",
          label: "少件/漏发"
        },
        {
          value: "选项3",
          label: "与商品描述不符"
        },
        {
          value: "选项4",
          label: "包装/商品残破"
        },
        {
          value: "选项5",
          label: "其他"
        }
      ],

      rules: {
        reason: [
          { required: true, message: "请选择退货原因", trigger: "blur" }
        ],
        dsc: [
          { required: true, message: "请输入问题描述！", trigger: "blur" },
          { required: true, message: "请输入问题描述！", trigger: "change" }
        ],
        contacts: [
          { required: true, validator: checkContacts, trigger: "blur" },
          { required: true, validator: checkContacts, trigger: "change" }
        ],
        phone: [
          // {required:true, type:"number", message:"请正确输入联系电话！",trigger:"blur" },
          { require: true, validator: checkPhone, trigger: "blur" },
          { require: true, validator: checkPhone, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>

<style>
.Apply-box {
  border-style: double;
  border-color: #cccccc;

  margin-top: 10px;

}
.ContactMsg {
  margin-top: 50px;
}
.orderMsg {
  /* border-style: double;
    border-color: #cccccc;

    margin-top:10px;
    margin-left:10%; */
  margin-right: 2%;
  padding-top: 20px;
  padding-left: 30px;
}
.header {
  background-color: rgb(249, 249, 249);
  height: 40px;
}
.header-text {
  line-height: 30px;
  margin: 5px 0 5px 10px;
}
.order-book {
  width: 90px;
  height: 120px;
  margin: 10px;
}

.order-box {
  border-width: 2px 2px 2px 0;
  border-style: solid;
  border-color: rgb(249, 249, 249);
  height: 140px;
}
.order-box:first-child {
  border-left-width: 2px;
}
.order-title-text {
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
}

.ApplyMsg {
  /* border-style:dotted;
    border-color: #cccccc;
    margin-top:30px;
    margin-left:10%; */

  margin-top: 30px;
  padding-top: 20px;
  padding-left: 30px;
}
.el-upload__tip {
  color: #cccccc;
}

.tips-box {
  background-color: #f1efef;
  color: #cccccc;

  margin-bottom: 30px;
  margin-right: 20px;
  padding: 30px 30px 30px 30px;
  line-height: 150%;
}
</style>
