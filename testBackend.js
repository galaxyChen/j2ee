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
                userId: 1, //该用户的用户id
                userName: 'tester', //该用户的昵称
                sessionId: 'asdfghjkl', //登录成功的时候返回这次登录的sessionId
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

    

    // console.log(response)
    res.json(response)
  }
  var addresses= [
    {
      name: "Foo",
      phone: "110",
      address: "scut",
      default:true,
      address_id:111
    },
    {
      name: "Limith",
      phone: "120",
      address: "China",
      default:false,
      address_id:222
    },
    {
      name: "merlin",
      phone: "518",
      address: "avalon",
      default:false,
      address_id:333
    }
  ]
  
  if (data['query']=='getAddress'){
    response = {
      status:1,//1是成功，0是失败
      data :{
        addresses :addresses
      }

    }
    // console.log(response)
    res.json(response)
  }

  if (data['query']=='addAddress'){
    let newAddress = {
      name:data.data['name'],
      phone:data.data['phone'],
      address:data.data['address'],
      default:false,
      address_id:888
    }
    addresses.push(newAddress)
    console.log(addresses)
    response = {
      status:1,//1是成功，0是失败
      err :'',
      data :{
        addresses :addresses
      }

    }
    // console.log(response)
    res.json(response)
  }

  if (data['query']=='deleteAddress'){

    let address_id = data.data.address_id
    function isDelete(element){
      return element.address_id!=address_id
    }
    addresses = addresses.filter(isDelete)
    console.log(addresses)
    response = {
      status:1,//1是成功，0是失败
      err :'',
      data :{
        addresses :addresses
      }

    }
    // console.log(response)
    res.json(response)
  }

  if (data['query']=='editAddress'){

    let address_id = data.data.address_id;

    addresses.forEach(element => {
      if(element.address_id==data.data.address_id){
        element.name = data.data.name
        element.phone = data.data.phone,
        element.address = data.data.address,
        element.default = data.data.default
      }
    });
    console.log(addresses)
    response = {
      status:1,//1是成功，0是失败
      err :'',
      data :{
        addresses :addresses
      }

    }
    // console.log(response)
    res.json(response)
  }


  if (data['query']=='register'){
    response = {
        status:1,//1是登录成功，0是登录失败
        data :{
            user_id:1,//该用户的用户id
            name:'tester',//该用户的昵称
            session_id:'asdfghjkl',//登录成功的时候返回这次登录的session_id
            err:'',//登录失败的时候返回出错原因
        }

    }
    res.json(response)
  }
});

app.listen(3001);
