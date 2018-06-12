<template>
    <div>
        <!-- 走马灯 --> 
        <el-carousel :interval="4000" type="card" height="200px">
                 <el-carousel-item v-for="item in 5" :key="item">
                     <h3>{{ item }}</h3>
                 </el-carousel-item>
         </el-carousel>
    新书上架 
        <div>
        </div>
    </div>

</template>
