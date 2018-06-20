var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


app.use(express.static('uploads'));

app.get('/', function (req, res) {
    res.send("backend is now running")
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/upload/', upload.single('img'), function (req, res, next) {
    var file = req.body.img;
    console.log(file)
    console.log(req.body)
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    // 接收文件成功后返回数据给前端
    res.json({status: 1});
})

app.post('/BookStore/', function (req, res) {
    data = req.body;
    let response = {}
    console.log(data)
    if (data['query']=='img'){
        console.log(data.img)
        console.log(typeof data.img)
    }

    if (data['query']=='getRecent'){
        let response = {
            status:1,
            data:{
                item_list:[
                    {
                      item_id:1,
                      item_name:'新东方1',
                      item_price:30,
                      url:'http://localhost:3001/1.png'
                    },
                    {
                      item_id:2,
                      item_name:'新东方2',
                      item_price:30,
                      url:'http://localhost:3001/2.png'
                    },
                    {
                      item_id:3,
                      item_name:'新东方3',
                      item_price:30,
                      url:'http://localhost:3001/3.png'
                    },
                    {
                      item_id:4,
                      item_name:'新东方4',
                      item_price:30,
                      url:'http://localhost:3001/4.png'
                    },
                  ]
            }
        }
        res.json(response)
    }

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