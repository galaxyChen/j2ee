var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

app.get('/', function (req, res) {
    res.send("backend is now running")
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/api', function (req, res) {
    data = req.body;
    let response = {}
    console.log(data)
    if (data['query'] == 'login') {
        let response = {
            status: 1, //1是登录成功，0是登录失败
            data: {
                user_id: 1, //该用户的用户id
                name: 'tester', //该用户的昵称
                session_id: 'asdfghjkl', //登录成功的时候返回这次登录的session_id
            },
            err: '数据库访问失败', //登录失败的时候返回出错原因
        };
        console.log(response)
        res.json(response)
    }
    if (data['query'] == 'register'){
        let response = {
            status:1,
            err:"数据库访问失败"
        }
        res.json(response)
    }
    if (data['query'] == 'check'){
        let response = {
            status:1
        }
        res.json(response)
    }
    if (data['query']=='signout'){
        let response = {
            status:1,
            err:"连接失败"
        }
        res.json(response)
    }
    if (data['query']=='getPwQuestion'){
        let response = {
            status:1,
            data:{
                question:"你的名字是？"
            }
        }
        
        res.json(response)
    }
    if (data['query']=='changePassword'){
        let response = {
            status:1
        }
        if (data['data']['pw']=='1') response['status'] = 1;
        if (data['data']['pw']=='2') response['status'] = 0;
        if (data['data']['pw']=='3') response['status'] = -1;
        response['err'] = '未知错误'
        res.json(response)
    }
    if (data['query']=='changeName'){
        let response = {
            status:1
        }
        
        if (data['data']['new_name']=='1') response['status'] = 1;
        if (data['data']['new_name']=='2') response['status'] = 0;
        if (data['data']['new_name']=='3') response['status'] = -1;
        response['err'] = '未知错误'
        res.json(response)
    }
});

app.listen(3001);