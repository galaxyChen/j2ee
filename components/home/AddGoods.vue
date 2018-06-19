<template>
    <el-col :span='12' :push='1' style="margin-top:30px;">
        <div class='AddGoods-box'>
            <el-form :model="Goods" :rules="rules" ref="Goods" label-width="100px">
                <el-form-item label="商品标题: " prop="title">
                    <el-input  v-model='Goods.title'  placeholder='请输入商品标题'></el-input>
                </el-form-item>
                <el-form-item label="书名: " prop="name">
                    <el-input  :value='Goods.name'  placeholder='请输入书名'></el-input>
                </el-form-item>
                <el-form-item label="作者：" prop="author">
                    <el-input  :value='Goods.author'  placeholder='请输入作者'></el-input>
                </el-form-item>
                <el-form-item label="出版社: " prop="publisher">
                    <el-input  :value='Goods.publisher'  placeholder='请输入出版社'></el-input>
                </el-form-item>
                <el-form-item label="出版日期: " prop="pubDate">
                     <!-- <el-input  :value='Goods.pubDate'  placeholder='请输入出版日期'></el-input> -->
                    <el-date-picker v-model="Goods.pubDate" type="date" placeholder="选择日期"> </el-date-picker>
                </el-form-item>
                <el-form-item label="图书类别: " prop="options">
                   <el-cascader class="index-input-box" :options="Goods.options" change-on-select></el-cascader>
                </el-form-item>
                <el-form-item label="价格: "  prop="price">
                    <el-input :value='Goods.price'  placeholder='请输入商品价格'></el-input>
                </el-form-item>
                <el-form-item label="库存数量: " prop="inventory">
                    <el-input  :value='Goods.inventory'  placeholder='请输入库存数量'></el-input>
                </el-form-item>
                <el-form-item label="配送方式: ">
                     <el-radio v-model="radio" label="1">包邮</el-radio>
                     <el-radio v-model="radio" label="2">邮费自理</el-radio>
                </el-form-item>
                 <el-form-item label="发货地: ">
                   <mapLinkage @updateArea="updateArea"></mapLinkage>
                </el-form-item>
                 <el-form-item label="商品描述: ">
                      <el-input  type="textarea"  :rows="2"  :value='Goods.dsc' placeholder="请输入商品描述" ></el-input>
                </el-form-item>
                 <el-form-item label="上传图片: ">
                    <el-upload class="upload-pic" 
                            action="https://jsonplaceholder.typicode.com/posts/"  
                            :show-file-list="true"
                            ref='upload'
                            :on-preview="handlePreview"   
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove" 
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            :auto-upload="false"
                            list-type="picture">
                        <el-button slot='trigger' size="small" type="primary">选择文件</el-button>
                        <el-button @click="commitImg" size="small" type="primary">确定上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
                    </el-upload>
                </el-form-item>
                <div style="float:right"> 
                    <el-button type="primary" @click="submitForm('Goods')">发布商品</el-button>
                    <el-button>取消</el-button>
                </div>
            </el-form>
        </div>
    </el-col>
</template>

<script >
import mapLinkage from "~/components/home/mapLinkage";
export default {
  components: {
    mapLinkage
  },
  data() {
    return {
      radio: "1",
      Goods: {
        title: "",
        name: "",
        author: "",
        publisher: "",
        pubDate: "",
        price: "",
        area: "",

        //选择图书类别
        options: [
          //小说 -> 其子分类
          {
            value: "xiaoshuo",
            label: "小说",
            children: [
              {
                value: "zhongguoxiaoshuo",
                label: "中国小说"
              },
              {
                value: "waiguoxiaohshuo",
                label: "外国小说"
              },
              {
                value: "xuanyituili",
                label: "悬疑推理"
              },
              {
                value: "wuxiaxiaoshuo",
                label: "武侠小说"
              },
              {
                value: "qita",
                label: "其他"
              }
            ]
          },
          //文艺 -> 其子分类
          {
            value: "wenyi",
            label: "文艺",
            children: [
              {
                value: "wenxue",
                label: "文学"
              },
              {
                value: "zhuanji",
                label: "传记"
              },
              {
                value: "yishu",
                label: "艺术"
              },
              {
                value: "sheying",
                label: "摄影"
              }
            ]
          },
          //童书 -> 其子分类。童书有：科普、绘本、文学、其他；
          {
            value: "tongshu",
            label: "童书",
            children: [
              {
                value: "kepu",
                label: "科普"
              },
              {
                value: "huiben",
                label: "绘本"
              },
              {
                value: "wenxue",
                label: "文学"
              },
              {
                value: "qita",
                label: "其他"
              }
            ]
          },
          //教育 -> 其子分类。教育下有：教材、外语、考试、中小学教辅、工具书
          {
            value: "jiaoyu",
            label: "教育",
            children: [
              {
                value: "jiaocai",
                label: "教材"
              },
              {
                value: "waiyu",
                label: "外语"
              },
              {
                value: "kaoshi",
                label: "考试"
              },
              {
                value: "zhongxiaoxuejiaofu",
                label: "中小学教辅"
              },
              {
                value: "gongjushu",
                label: "工具书"
              }
            ]
          },
          //人文社科 -> 其子分类。人文社科有：历史、古籍、哲学/宗教、文化、政治/军事、法律、社会、科学、心理学；
          {
            value: "renwensheke",
            label: "人文社科",
            children: [
              {
                value: "lishi",
                label: "历史"
              },
              {
                value: "guji",
                label: "古籍"
              },
              {
                value: "zhexue/zongjiao",
                label: "哲学/宗教"
              },
              {
                value: "wenhua",
                label: "文化"
              },
              {
                value: "zhengzhi/junshi",
                label: "政治/军事"
              },
              {
                value: "falv",
                label: "法律"
              },
              {
                value: "shehui",
                label: "社会"
              },
              {
                value: "kexue",
                label: "科学"
              },
              {
                value: "xinlixue",
                label: "心理学"
              }
            ]
          },
          //其他
          {
            value: "qita",
            label: "其他"
          }
        ]
      },

      //图片
      fileList: [
        
      ],

      //验证必填项是否填写
      rules: {
        title: [
          { required: true, message: "商品标题不能为空", trigger: "blur" },
          { min: 1, max: 30, message: "标题长度应在30字内！", trigger: "blur" }
        ],
        name: [
          { required: true, message: "书名不能为空", trigger: "blur" },
          { min: 1, max: 30, message: "书名应在30字内！", trigger: "blur" }
        ],
        author: [
          { required: true, message: "作者名不能为空", trigger: "blur" },
          { min: 1, max: 30, message: "作者名应在30字内！", trigger: "blur" }
          //应有要求作者姓名不能为数字->未写
        ],
        publisher: [
          { required: true, message: "出版社名不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "出版社名应在 50字内", trigger: "blur" }
        ],
        pubDate: [
          {
            type: "date",
            required: true,
            message: "请选择出版时间",
            trigger: "change"
          }
        ],

        options: [
          { required: true, message: "请选择书籍类别", trigger: "change" }
        ],

        price: [
          { required: true, message: "价格不能为空", trigger: "blur" }
          //应有验证输入必须为数字
        ],
        inventory: [
          { required: true, message: "库存量不能为空", trigger: "blur" },
          { min: 0, max: 100, message: "库存量范围为：0-100" }
        ]

        //商品描述可以为空
      },

      //日期选择
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },

  methods: {
    //选择发货地地区
    updateArea(area) {
      this.Goods.area = area;
    },

    //上传图片处理操作
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
      duration: 0;
    },
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
    async commitImg(){
        let file = this.$refs.upload.uploadFiles[0]
        file = this.$refs.upload.getFile(file)
        // console.log(file.raw instanceof File)
        // console.log(this.$refs.upload.$refs['upload-inner'].upload)
        let data = new FormData()
        data.append('file',file.raw);
        let header = {'Content-Type': 'multipart/form-data'}
        let response = await this.$axios.send(data,'/BookStore/test/',header)
        console.log(response)
    },

    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>


<style>
</style>
