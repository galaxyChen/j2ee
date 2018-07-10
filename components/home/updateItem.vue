<template>
<el-container>
    <el-header>
        <el-button @click="goBack" class="back-button" size="medium" type='text' icon="el-icon-back">返回</el-button>
    </el-header>
    <el-main>
            <el-col v-loading='loading' element-loading-text='加载中，请稍后' :span='12' :push='1' style="margin-bottom:30px;">
        <div class='AddGoods-box'>
            <el-form :model="Goods" :rules="rules" ref="Goods" label-width="100px">
                <el-form-item label="商品标题: " prop="itemTitle">
                    <el-input  v-model='Goods.itemTitle'  placeholder='请输入商品标题'></el-input>
                </el-form-item>
                <el-form-item label="书名: " prop="bookName">
                    <el-input  v-model='Goods.bookName'  placeholder='请输入书名'></el-input>
                </el-form-item>
                <el-form-item label="作者：" prop="author">
                    <el-input  v-model='Goods.author'  placeholder='请输入作者'></el-input>
                </el-form-item>
                <el-form-item label="出版社: " prop="press">
                    <el-input  v-model='Goods.press'  placeholder='请输入出版社'></el-input>
                </el-form-item>
                <el-form-item label="出版日期: " prop="publicationDate">
                    <el-date-picker v-model="Goods.publicationDate" type="month" placeholder="选择日期" value-format='yyyy-MM'> </el-date-picker>
                </el-form-item>
                <el-form-item label="图书类别: " prop="options">
                   <el-cascader class="index-input-box" :options="Goods.options" v-model="type" change-on-select></el-cascader>
                </el-form-item>
                <el-form-item label="价格: "  prop="price">
                     <el-input-number v-model="Goods.price" :precision="2" :step="1" :min='0'></el-input-number>
                </el-form-item>
                <el-form-item label="库存数量: " prop="quantity">
                     <el-input-number v-model="Goods.quantity"  :min="1"  label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="配送方式: ">
                     <el-radio v-model="radio" label='1'>包邮</el-radio>
                     <el-radio v-model="radio" label='0'>邮费自理</el-radio>
                </el-form-item>
                 <el-form-item label="发货城市: ">
                   <mapLinkage ref='area'></mapLinkage>
                </el-form-item>
                <el-form-item label="详细地址: " prop='addressDetail'>
                  <el-input  v-model='Goods.addressDetail'  placeholder='默认退货地址'></el-input>
                </el-form-item>
                <el-form-item label="联系人: " prop='seller'>
                  <el-input  v-model='Goods.sellerName'  placeholder='默认退货联系人'></el-input>
                </el-form-item>
                <el-form-item label="联系电话: " prop='phoneNumber'>
                  <el-input  v-model='Goods.phoneNumber'  placeholder='默认退货联系电话'></el-input>
                </el-form-item>
                 <el-form-item label="商品描述: ">
                      <el-input  type="textarea"  :rows="2"  v-model='Goods.description' placeholder="请输入商品描述" ></el-input>
                </el-form-item>
                 <el-form-item label="上传图片: ">
                    <el-upload class="upload-pic" 
                            action=""  
                            :show-file-list="true"
                            ref='upload'
                            :before-remove="beforeRemove" 
                            :limit="1"
                            :file-list="fileList"
                            :on-exceed="handleExceed"
                            :auto-upload="false"
                            list-type="picture">
                        <el-button slot='trigger' size="small" type="primary">选择文件</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                    </el-upload>
                </el-form-item>
                <div style="float:right"> 
                    <el-button type="primary" @click="submitForm('Goods')">发布商品</el-button>
                    <!-- <el-button>取消</el-button> -->
                </div>
            </el-form>
        </div>
    </el-col>
    </el-main>
</el-container>

</template>

<script >
import mapLinkage from "~/components/home/mapLinkage";
import Cookies from "js-cookie";
export default {
  components: {
    mapLinkage
  },
  mounted() {
    this.setData();
  },
  props: ["item"],
  data() {
    var validPhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else {
        let p = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!p.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    return {
      radio: "1",
      loading: false,
      area:[],
      type:['全部'],
      fileList:[],
      Goods: {
        itemTitle: "",
        bookName: "",
        author: "",
        press: "",
        publicationDate: "",
        price: 0,
        quantity: 0,
        description: "",
        addressDetail: "",
        phoneNumber: "",
        sellerName: "",
        //选择图书类别
        options: [
          //小说 -> 其子分类
          {
            value: "小说",
            label: "小说",
            children: [
              {
                value: "中国小说",
                label: "中国小说"
              },
              {
                value: "外国小说",
                label: "外国小说"
              },
              {
                value: "悬疑小说",
                label: "悬疑推理"
              },
              {
                value: "武侠小说",
                label: "武侠小说"
              },
              {
                value: "其他",
                label: "其他"
              }
            ]
          },
          //文艺 -> 其子分类
          {
            value: "文艺",
            label: "文艺",
            children: [
              {
                value: "文学",
                label: "文学"
              },
              {
                value: "传记",
                label: "传记"
              },
              {
                value: "艺术",
                label: "艺术"
              },
              {
                value: "摄影",
                label: "摄影"
              },
              {
                value: "其他",
                label: "其他"
              }
            ]
          },
          //童书 -> 其子分类。童书有：科普、绘本、文学、其他；
          {
            value: "童书",
            label: "童书",
            children: [
              {
                value: "科普",
                label: "科普"
              },
              {
                value: "绘本",
                label: "绘本"
              },
              {
                value: "文学",
                label: "文学"
              },
              {
                value: "其他",
                label: "其他"
              }
            ]
          },
          //教育 -> 其子分类。教育下有：教材、外语、考试、中小学教辅、工具书
          {
            value: "教育",
            label: "教育",
            children: [
              {
                value: "教材",
                label: "教材"
              },
              {
                value: "外语",
                label: "外语"
              },
              {
                value: "考试",
                label: "考试"
              },
              {
                value: "中小学教辅",
                label: "中小学教辅"
              },
              {
                value: "工具书",
                label: "工具书"
              },
              {
                value: "其他",
                label: "其他"
              }
            ]
          },
          //人文社科 -> 其子分类。人文社科有：历史、古籍、哲学/宗教、文化、政治/军事、法律、社会、科学、心理学；
          {
            value: "人文社科",
            label: "人文社科",
            children: [
              {
                value: "历史",
                label: "历史"
              },
              {
                value: "古籍",
                label: "古籍"
              },
              {
                value: "哲学/宗教",
                label: "哲学/宗教"
              },
              {
                value: "文化",
                label: "文化"
              },
              {
                value: "政治/军事",
                label: "政治/军事"
              },
              {
                value: "法律",
                label: "法律"
              },
              {
                value: "社会",
                label: "社会"
              },
              {
                value: "科学",
                label: "科学"
              },
              {
                value: "心理学",
                label: "心理学"
              },
              {
                value: "其他",
                label: "其他"
              }
            ]
          },
          //其他
          {
            value: "其他",
            label: "其他"
          }
        ]
      },
      //验证必填项是否填写
      rules: {
        itemTitle: [
          { required: true, message: "商品标题不能为空", trigger: "change" },
          {
            min: 1,
            max: 30,
            message: "标题长度应在30字内！",
            trigger: "change"
          }
        ],
        bookName: [
          { required: true, message: "书名不能为空", trigger: "change" },
          { min: 1, max: 30, message: "书名应在30字内！", trigger: "change" }
        ],
        author: [
          { required: true, message: "作者名不能为空", trigger: "change" },
          { min: 1, max: 30, message: "作者名应在30字内！", trigger: "change" }
          //应有要求作者姓名不能为数字->未写
        ],
        press: [
          { required: true, message: "出版社名不能为空", trigger: "change" },
          { min: 1, max: 50, message: "出版社名应在 50字内", trigger: "change" }
        ],
        publicationDate: [
          {
            required: true,
            message: "请选择出版时间",
            trigger: "change"
          }
        ],
        addressDetail: [
          {
            required: true,
            message: "默认退货地址不能为空",
            trigger: "change"
          },
          { min: 1, max: 50, message: "长度不超过50个字符", trigger: "change" }
        ],
        sellerName: [
          {
            required: true,
            message: "退货联系人不能为空",
            trigger: "change"
          }
        ],
        phoneNumber: [
          {
            required: true,
            message: "退货电话不能为空",
            trigger: "change"
          },
          { validator: validPhone, trigger: "change" }
        ],

        options: [
          { required: true, message: "请选择书籍类别", trigger: "change" }
        ],

        price: [
          { required: true, message: "价格不能为空", trigger: "blur" }
          //应有验证输入必须为数字
        ],
        quantity: [
          { required: true, message: "库存量不能为空", trigger: "blur" }
        ]

        //商品描述可以为空
      }
    };
  },
  methods: {
    async setData() {
      let query = {
        query: "getItemDetail",
        data: {
          itemId: this.item + ""
        }
      };
      this.loading = true;
      let response = await this.$axios.send(query);
      if (response.status == 1) {
        let data = {
          itemTitle: response.data.product.itemTitle, //商品标题
          bookName: response.data.product.bookName, //书的名字
          author: response.data.product.author, //作者
          press: response.data.product.press, //出版社
          publicationDate: response.data.product.publicationDate, //出版日期
          bookCategory: this.type, //标签，用于搜索的筛选，是一个字符串数组
          price: response.data.product.price + "", //价格
          quantity: response.data.product.quantity + "", //库存
          freePostage: this.radio + "", //是否包邮，0/1
          addressDetail: response.data.product.addressDetail,
          description: response.data.product.description, //详细描述
          pictureAddress: response.data.product.pictureAddress, //图片的链接。在发布商品之前会先执行上传图片操作，成功获得图片的url之后才会发送这个请求
          phoneNumber: response.data.product.phoneNumber,
          sellerName: response.data.product.sellerName
        };
        let pictureName = data.pictureAddress.split('/')
        pictureName = pictureName[pictureName.length - 1]
        this.fileList.push({
          name:pictureName,
          url:data.pictureAddress
        })
        this.$refs.area.set(response.data.product.province,response.data.product.city)
        let options = this.Goods.options;
        data.options = options;
        this.Goods = data;
        this.loading = false;
        this.radio = response.data.product.freePostage+""
        this.type = response.data.product.bookCategory.split('/')
        console.log(this.type)
      } else if (response.status == 0) {
        this.$message.error("发生错误" + response.err);
      } else {
        this.$message.error("登录超时！");
        Cookies.remove("userId");
        Cookies.remove("sessionId");
        Cookies.remove("userName");
        this.$router.push({ path: "/" });
      }
    },
    goBack() {
      this.$emit("goBack")
    },
    //选择发货地地区
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    async commitImg() {
      if (this.$refs.upload.uploadFiles.length == 0) return "";
      let file = this.$refs.upload.uploadFiles[0];
      file = this.$refs.upload.getFile(file);
      // console.log(file.raw instanceof File)
      // console.log(this.$refs.upload.$refs['upload-inner'].upload)
      if (!file.raw){
        return undefined;
      }
      let data = new FormData();
      console.log(file.raw)
      data.append("file", file.raw);
      data.append("query", "uploadImg");
      data.append("userId", Cookies.get("userId"));
      data.append("sessionId", Cookies.get("sessionId"));
      let header = { "Content-Type": "multipart/form-data" };
      let response = await this.$axios.send(data, "/BookStore/upload/", header);
      if (response.status == 1) {
        return response.data.pictureAddress;
      } else if (response.status == 0) {
        this.$message.error("发生错误:" + response.err);
        return false;
      } else {
        Cookies.remove("userId");
        Cookies.remove("sessionId");
        Cookies.remove("userName");
        this.$router.push({ path: "/" });
      }
    },
    changeType(value) {
      return;
      if (value.length == 2) {
        this.type = value;
      }
      if (value.length == 1) {
        value.push("全部");
        this.type = value;
      }
    },
    //提交表单
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let area = this.$refs.area.test();
          if (area) {
            console.log(area);
            //添加loading
            this.loading = true;
            //上传图片
            let url = await this.commitImg();
            console.log(url);
            if (url === false) {
              this.loading = false;
              return;
            }
            if (!url) url = this.Goods.pictureAddress;
            //发送请求
            let data = {
              query: "updateBook",
              data: {
                userId: Cookies.get("userId"),
                sessionId: Cookies.get("sessionId"), //常规验证
                itemId:this.item + "",
                itemTitle: this.Goods.itemTitle, //商品标题
                bookName: this.Goods.bookName, //书的名字
                author: this.Goods.author, //作者
                press: this.Goods.press, //出版社
                publicationDate: this.Goods.publicationDate, //出版日期
                bookCategory: this.type, //标签，用于搜索的筛选，是一个字符串数组
                price: this.Goods.price + "", //价格
                quantity: this.Goods.quantity + "", //库存
                freePostage: this.radio + "", //是否包邮，0/1
                province: area["prov"],
                city: area["city"],
                addressDetail: this.Goods.addressDetail,
                description: this.Goods.description, //详细描述
                pictureAddress: url, //图片的链接。在发布商品之前会先执行上传图片操作，成功获得图片的url之后才会发送这个请求
                phoneNumber: this.Goods.phoneNumber,
                sellerName: this.Goods.seller
              }
            };
            console.log(data);
            let response = await this.$axios.send(data);
            if (response.status == 1) {
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              this.loading = false;
              this.$emit("updateItem")
            } else if (response.status == 0) {
              this.$message.error("发生错误:" + response.err);
            } else {
              Cookies.remove("userId");
              Cookies.remove("sessionId");
              Cookies.remove("userName");
              this.$router.push({ path: "/" });
            }
          } else {
            //测试未通过
            this.$message.error("有信息未填写完毕!");
            return;
          }
        } else {
          this.$message.error("有信息未填写完毕!");
        }
      });
    }
  }
};
</script>


<style>
.back-button {
  color: #999;
  font-size: 24px;
  /* margin-top: 16px; */
}
</style>
