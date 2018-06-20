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
app.post('/BookStore/', function (req, res) {
  data = req.body;
  response = {}
  console.log(data)
  if (data['query']=='login'){
      response = {
        status:1,//1是登录成功，0是登录失败
        data :{
            user_id:1,//该用户的用户id
            name:'tester',//该用户的昵称
            session_id:'asdfghjkl',//登录成功的时候返回这次登录的session_id
            err:'',//登录失败的时候返回出错原因
        }

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

    let address_id = data.data.address_id

    addresses.forEach(element => {
      if(element.address_id==address_id){
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
