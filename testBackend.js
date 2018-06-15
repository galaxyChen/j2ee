var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/',function(req,res){
    res.send("backend is now running")
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/', function (req, res) {
    data = req.body;
    response = {}
  console.log(data)
  if (data['query']=='login'){
      response = {
        status:0,//1是登录成功，0是登录失败
        user_id:1,//该用户的用户id
        name:'tester',//该用户的昵称
        session_id:'asdfghjkl',//登录成功的时候返回这次登录的session_id
        err:'',//登录失败的时候返回出错原因
    };
    console.log(response)
    res.json(response)
  }
});

app.listen(3001);
