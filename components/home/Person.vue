<template>
    <el-col :span='10' :push='3'>
        <div class='person-main-box'>
            <el-form :inline="true">
                <el-form-item label="昵称">
                    <el-input :disabled='change' :value='user.name'  :placeholder='user.name'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeName">修改</el-button>
                </el-form-item>
            </el-form>
            <a class='person-pwtitle'>修改密码</a>
            <el-switch  v-model="changePw"></el-switch>
            <div class='person-change-pw-box'>
                <el-collapse-transition>
                    <el-form v-if='changePw'>
                        <a class='person-question'>密保问题：{{pw.question}}</a>
                        <el-input class='person-input-box' placeholder="密保答案" size='medium'></el-input>
                        <el-input class='person-input-box'  size='medium'>
                            <template slot='prepend'>旧密码</template>
                        </el-input>
                        <el-input class='person-input-box'  size='medium'>
                            <template slot='prepend'>新密码</template>
                        </el-input>
                        <el-button class="person-changepw-button" type="primary">确认修改</el-button>
                    </el-form>
                </el-collapse-transition>
            </div>
        </div>
    </el-col>
</template>

<style>
    .person-pwtitle {
        margin-right: 18px;
        font-size: 18px;
    }

    .person-main-box{
        margin-top: 60px;
    }

    .person-question {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 20px;
    }
    .person-input-box{
        margin-top: 10px;
        margin-block-end: 10px;
    }

    .person-change-pw-box{
        margin-top: 30px;
    }

    .person-changepw-button{
        margin-top: 20px;
        margin-left: 530px;
    }
</style>


<script>
export default {
    props:['user'],
    data(){
        return {
            change:false,
            changePw:false,
            pw:{
                question:"你的生日是?"
            }
        }
    },
    methods:{
        changeName(){
            this.change = !this.change;
        }
    }
}
</script>
