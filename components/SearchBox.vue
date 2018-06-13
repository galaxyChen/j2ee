<template>
  <div class="search-box" style="text-align:center;" >
      <el-row :gutter="20" style="border-radius:4px; min-height: 36px;">
          <el-col :span="14" style="margin-left:10%;padding:10px;">
                      <el-input class="index-input-box" placeholder="请输入内容"  prefix-icon="el-icon-search" ></el-input>
          </el-col>
          <el-col :span="4" style="padding-top:8px;height:36px;">
              <el-cascader class="index-input-box" :options="options" change-on-select @change='changeValue'></el-cascader>
          </el-col>
          <el-col :span="2" style="padding:10px;"> 
                      <el-button size='small' class="index-input-box" type="primary"  >搜 索 </el-button>
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
    };
  },
  methods: {
    changeValue(value) {
      console.log(value);
    }
  }
};
</script>
