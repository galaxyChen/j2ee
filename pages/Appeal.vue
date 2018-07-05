<template>
    <el-row v-loading='loading' element-loading-text='上传资料中，请稍后'  type='flex' justify="center">
        <el-col style='padding-top:30px;' :xs="18" :sm="18" :md="12" :lg="12" :xl="12">
            <h4 style='font-size:24px;margin-bottom:20px;'>申请平台介入</h4>
            <el-card>
                <el-form ref='data' :model='data' :rules="rules">
                    <el-form-item prop='reason'>
                        <el-input placeholder="申诉理由" type="textarea" :rows='3' v-model="data.reason" :maxlength='300'></el-input> 
                    </el-form-item>
                    <el-upload  
                            style="margin-top:20px;"
                            action=""  
                            :show-file-list="true"
                            ref='upload'
                            :before-remove="beforeRemove" 
                            :limit="1"
                            :on-exceed="handleExceed"
                            :auto-upload="false"
                            list-type="picture">
                        <el-button slot='trigger' size="small" type="primary">选择文件</el-button>
                        <a style='margin-left:10px;'>上传申诉凭证</a>
                        <div slot="tip" style="margin-top:5px;font-size:12px;">只能上传jpg/png文件，且不超过1M</div>
                    </el-upload>
                    <el-form-item prop='name'>
                        <el-input :maxlength='15' style="margin-top:20px;" v-model="data.name">
                            <template slot="prepend">联系人</template>
                        </el-input>
                    </el-form-item>
                
                    <el-form-item prop='phone'>
                        <el-input style="margin-top:20px;" v-model="data.phone">
                            <template slot="prepend">联系电话</template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-row style="margin-top:10px;" type="flex" justify="end">
                    <el-button @click="submit" type="success">确认申诉</el-button>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<style scoped>
</style>

<script>
import Cookies from "js-cookie";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
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
      data: {
        reason: "",
        name: "",
        phone: ""
      },
      loading: false,
      rules: {
        phone: [
          {
            required: true,
            message: "电话不能为空",
            trigger: "change"
          },
          { validator: validatePhone, trigger: "change" }
        ],
        name: [
          { required: true, message: "请输入联系人名字", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "请输入申诉理由", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 300 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
      let fileName = file.name.split(".");
      if (fileName.length != 2) {
        this.$message.error("上传图片文件名有误!");
        return false;
      }
      if (fileName[1] != "jpg" || fileName[1] != "png") {
        this.$message.error("只支持jpg或者png文件!");
        return false;
      }
      let size = file.size;
      if (size / 1024 / 1024 > 1) {
        this.$message.error("图片大小不能超过1M!");
        return false;
      }
      // console.log(file.raw instanceof File)
      // console.log(this.$refs.upload.$refs['upload-inner'].upload)
      let data = new FormData();
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
    submit() {
      this.$confirm("确认提交申诉吗？", "确认信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$refs.data.validate(async valide => {
          if (!valide) {
            this.$message.error("有信息未填写正确!");
            return;
          }
          this.loading = true;
          //上传图片
          let url = await this.commitImg();
          console.log(url);
          if (url === false) {
            this.loading = false;
            return;
          }
          let query = {
            query: "appeal",
            data: {
              userId: Cookies.get("userId") + "",
              sessionId: Cookies.get("sessionId"),
              afterServiceId: this.$route.query["id"] + "",
              description: this.data.reason,
              pictureAddress: url,
              name: this.data.name,
              phoneNumber: this.data.phone,
              complaintType: this.$route.query["type"] + ""
            }
          };
          let response = await this.$axios.send(query);
          if (response.status == 1) {
            this.loading = false;
            this.$message({
              message: "申诉申请已提交！",
              type: "success"
            });
            let index = this.$route.query.type == 1 ? "3-3" : "3-4";
            let userId = Cookies.get("userId");
            this.$router.push({
              path: `/home/${userId}`,
              query: { index: index }
            });
          } else if (response.status == 0) {
            this.$message.error("发现错误:" + response.err);
          } else {
            this.$message.error("登录超时！");
            Cookies.remove("userId");
            Cookies.remove("sessionId");
            Cookies.remove("userName");
            this.$router.push({ path: "/" });
          }
        });
      });
    }
  }
};
</script>
