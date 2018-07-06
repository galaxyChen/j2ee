<template>
  <div class="search-box" style="text-align:center;" >
      <el-row :gutter="17" style="border-radius:4px; min-height: 36px;">
          <el-col :span="12" style="margin-left:10%;padding:10px;">
                      <el-input v-model="searchText" class="index-input-box" placeholder="请输入内容"  prefix-icon="el-icon-search" ></el-input>
          </el-col>
          <el-col :span="3" style="margin-left:-8px;padding-top:8px;height:36px;">
              <el-cascader v-model="tag" class="index-input-box" :options="options" change-on-select @change='changeValue'></el-cascader>
          </el-col>
          <el-col :span="2" style="margin-left:-15px;padding:10px;"> 
                      <el-button @click="search" size='small' class="index-input-box" type="primary"  >搜 索 </el-button>
              </el-col>
      </el-row> 
  </div>
</template>

<style scoped>
.index-input-box {
  font-size: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      options: [
        //全部
        {
          value: "全部",
          label: "全部"
        },
        //小说 -> 其子分类
        {
          value: "小说",
          label: "小说",
          children: [
            {
              value: "全部",
              label: "全部"
            },
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
              value: "全部",
              label: "全部"
            },
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
            }
          ]
        },
        //童书 -> 其子分类。童书有：科普、绘本、文学、其他；
        {
          value: "童书",
          label: "童书",
          children: [
            {
              value: "全部",
              label: "全部"
            },
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
              value: "全部",
              label: "全部"
            },
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
            }
          ]
        },
        //人文社科 -> 其子分类。人文社科有：历史、古籍、哲学/宗教、文化、政治/军事、法律、社会、科学、心理学；
        {
          value: "人文社科",
          label: "人文社科",
          children: [
            {
              value: "全部",
              label: "全部"
            },
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
            }
          ]
        },
        //其他
        {
          value: "其他",
          label: "其他"
        }
      ],
      searchText: "",
      tag: ["全部"]
    };
  },
  methods: {
    changeValue(value) {
      console.log(this.tag);
      if (value.length == 1 && value[0] == '其它'){
        this.tag.push('全部')
      }
    },
    search() {
      let text = this.searchText;
      let tag = this.tag;
      if (text==''){
        this.$message({
          message:'搜索内容不能为空！',
          type:'info'
        })
        return ;
      }
      if (text != "") {
        this.$router.push({
          path: "search",
          query: {
            text: text,
            tag: tag,
            time_stamp:new Date()-0
          }
        });
      }
      this.$emit('doSearch',text,tag)
    }
  }
};
</script>
