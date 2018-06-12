<template >
    <el-container style="padding:5px">
         <el-header>
            <el-button type="text" style="color:white">首页</el-button>
            <el-button type="text" style="color:white;margin-left:85%">登录    注册</el-button>
            <el-button type="text" style="color:white;margin-left:5%">购物车</el-button>
         </el-header>
        
         <el-main>
             <!-- 走马灯组件 -->
              <el-carousel :interval="4000" type="card" height="320px">
                 <el-carousel-item v-for="item in 5" :key="item">
                     <!-- 待修改，此处仅作静态页面展示 -->
                     <img src="../assets/6.jpg">
                     <h3>{{ item }}</h3>
                     
                 </el-carousel-item>
             </el-carousel>

             <!-- 搜索框组件 -->
             <div class="search-box" style="margin-top:-100px;text-align:center;" >
                 <el-row :gutter="20" style="border-radius:4px; min-height: 36px;">
                        <el-col :span="14" style="margin-left:10%;padding:10px;">
                                 <el-input placeholder="请输入内容"  prefix-icon="el-icon-search" v-model="inputSearch"></el-input>
                        </el-col>
                        <el-col :span="4" style="padding:10px;">
                                 <el-cascader :options="options" change-on-select></el-cascader>
                        </el-col>
                        <el-col :span="2" style="padding:10px;"> 
                                 <el-button type="primary" style="padding:23px;" >搜 索 </el-button>
                         </el-col>
                </el-row> 
            </div>

             <!-- 新书上架组件 -->
             <div id="newBookBox"  style="text-align:left;">
                <el-button type="text" style="color:green;font-size:28px;">新书上架</el-button> 
                <hr style="margin-top:-50px;">

                <div class="goods" >
                    <img src="../assets/2.jpg">1
                    <div style="margin-top:-100px;"> 
                        <p style="margin-top:-50px;margin-left:10px;">{{booktitle1}}</p>
                        <p style="margin-top:-100px;margin-left:10px;">价格： {{price1}}</p>
                        <div style="margin-top:-100px;margin-left:10px;">
                            <el-button type="primary" >查看详情</el-button>
                        </div>
                    </div>
                </div>

                <div class="goods">
                    <img src="../assets/3.jpg">2
                    <div style="margin-top:-100px;">
                        <p style="margin-top:-50px;margin-left:10px;">{{booktitle2}}</p>
                        <p style="margin-top:-100px;margin-left:10px;">价格： {{price2}}</p>
                        <div style="margin-top:-100px;">
                            <el-button type="primary" >查看详情</el-button>
                        </div>
                    </div>
                </div>

                <div class="goods" >
                    <img src="../assets/4.jpg">3
                    <div style="margin-top:-100px;">
                        <p style="margin-top:-50px;margin-left:10px;">{{booktitle3}}</p>
                        <p style="margin-top:-100px;margin-left:10px;">价格： {{price3}}</p>
                        <div style="margin-top:-100px;"> 
                             <el-button type="primary" >查看详情</el-button>
                        </div>
                    </div>
                </div>

                <div class="goods">
                    <img src="../assets/5.jpg">4
                    <div style="margin-top:-100px;">
                        <p style="margin-top:-50px;margin-left:10px;">{{booktitle4}}</p>
                        <p style="margin-top:-100px;margin-left:10px;">价格： {{price4}}</p>
                        <div style="margin-top:-100px;">
                            <el-button type="primary" >查看详情</el-button>
                        </div>
                    </div>
                </div>

            </div>
            
         </el-main>

        <el-footer>Footer</el-footer>
</el-container>
</template>

<script>
export default {
        data(){
            return{
                booktitle1:'新东方GRE词汇1',
                booktitle2:'新东方GRE词汇2',
                booktitle3:'新东方GRE词汇3',
                booktitle4:'新东方GRE词汇4',

                price1: '￥30',
                price2: '￥30',
                price3: '￥30',
                price4: '￥30',

                options: [ 
                    //小说 -> 其子分类
                     { 
                         value: 'xiaoshuo',
                         label: '小说',
                         children: [{
                             value: 'zhongguoxiaoshuo',
                             label: '中国小说', 
                             }, {
                             value: 'waiguoxiaohshuo',
                             label: '外国小说',
                             },{
                             value: 'xuanyituili',
                             label: '悬疑推理',
                             },{
                             value: 'wuxiaxiaoshuo',
                             label: '武侠小说',
                             },{
                             value: 'qita',
                             label: '其他',
                             }]
                          }, 
                    //文艺 -> 其子分类
                     {
                         value: 'wenyi',
                         label: '文艺',
                         children: [{
                             value: 'wenxue',
                             label: '文学',
                          },
                           {
                             value: 'zhuanji',
                             label: '传记',
                            }, 
                           {
                            value: 'yishu',
                             label: '艺术',
                             },  {
                            value: 'sheying',
                             label: '摄影',
                             }]
                     },
                     //童书 -> 其子分类。童书有：科普、绘本、文学、其他；
                    {
                         value: 'tongshu',
                         label: '童书',
                        children: [{
                             value: 'kepu',
                             label: '科普'
                             }, {
                             value: 'huiben',
                             label: '绘本'
                             }, {
                             value: 'wenxue',
                             label: '文学'
                             }, {
                             value: 'qita',
                             label: '其他'
                             }]
                    },
                    //教育 -> 其子分类。教育下有：教材、外语、考试、中小学教辅、工具书
                    {
                         value: 'jiaoyu',
                         label: '教育',
                        children: [{
                             value: 'jiaocai',
                             label: '教材'
                             }, {
                             value: 'waiyu',
                             label: '外语'
                             }, {
                             value: 'kaoshi',
                             label: '考试'
                             }, {
                             value: 'zhongxiaoxuejiaofu',
                             label: '中小学教辅'
                             },{
                                 value:'gongjushu',
                                 label:'工具书'
                             }]
                    },
                    //人文社科 -> 其子分类。人文社科有：历史、古籍、哲学/宗教、文化、政治/军事、法律、社会、科学、心理学；
                    {
                         value: 'renwensheke',
                         label: '人文社科',
                        children: [{
                             value: 'lishi',
                             label: '历史'
                             }, {
                             value: 'guji',
                             label: '古籍'
                             }, {
                             value: 'zhexue/zongjiao',
                             label: '哲学/宗教'
                             }, {
                             value: 'wenhua',
                             label: '文化'
                             },{
                                 value:'zhengzhi/junshi',
                                 label:'政治/军事'
                             },{
                                 value:'falv',
                                 label:'法律'
                             },{
                                 value:'shehui',
                                 label:'社会',
                             },{
                                 value:'kexue',
                                 label:'科学'
                             },{
                                 value:'xinlixue',
                                 label:'心理学'
                             }]
                    },
                    //其他
                    {
                        value: 'qita',
                        label:'其他'
                    }
                    ],
                }
        }
}
</script>

<style>
body{
    background-color:#d3dce6;
    font-family: Hiragino Sans GB;
}

  .el-header,.el-footer{
    background-color: #B3C0D1;
    color: #333;
    /* text-align: center; */
    line-height: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
.el-input__inner{
    height: 70px;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: left;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

.goods{
      float:left;
      margin:20px 4%;
      
      border-style: dashed;
      border-color: #E9EEF3;
  }
  
</style>