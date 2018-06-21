var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer')
var upload = multer({dest: 'uploads/'})

<<<<<<< HEAD


var addresses= [
=======
var addresses = [
>>>>>>> 8e94333f8e72efd30158450d6a44cf5f0727ec32
  {
    recipientName: "Foo",
    phoneNumber: "110",
    addressDetail: "scut",
<<<<<<< HEAD
    province : "Guangdong",
    city:"Guangzhou",
    isDefaultAddress:true,
    addressId:111
  },
  {
    recipentName: "Lilith",
    phoneNumber: "120",
    province : "moon",
    city:"moon",
    addressDetail: "CCC",
    isDefaultAddress:false,
    addressId:222
  },
  {
    recipentName: "merlin",
=======
    isDefaultAddress: true,
    addressId: 111
  }, {
    recipientName: "Lilith",
    phoneNumber: "120",
    addressDetail: "China",
    isDefaultAddress: false,
    addressId: 222
  }, {
    recipientName: "merlin",
>>>>>>> 8e94333f8e72efd30158450d6a44cf5f0727ec32
    phoneNumber: "518",
    province : "moon",
    city:"moon",
    addressDetail: "avalon",
    isDefaultAddress: false,
    addressId: 333
  }
]
var tableData= [
  {
    information:'merlin',
    price: 518,
    nums:1,

    quantity:10,
    itemState:1
  }, 
  {
    information:'lilith',
    price: 518,
    nums:1,

    quantity:15,
    itemState:1
  }, 
  {
    information:'bb',
    price: 518,
    nums:1,

    quantity:20,
    itemState:1
  }, 
  {
    information:'aa',
    price: 518,
    nums:1,

    quantity:8,
    itemState:1
  }
]
app.use(express.static('uploads'));

app.get('/', function (req, res) {
  res.send("backend is now running")
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));

app.post('/upload/', upload.single('img'), function (req, res, next) {
  var file = req.body.img;
  console.log(file)
  console.log(req.body)
  // console.log('文件类型：%s', file.mimetype); console.log('原始文件名：%s',
  // file.originalname); console.log('文件大小：%s', file.size);
  // console.log('文件保存路径：%s', file.path); 接收文件成功后返回数据给前端
  res.json({status: 1});
})

app.post('/BookStore/', function (req, res) {
  data = req.body;
  let response = {}
  console.log(data)
  if (data['query'] == 'img') {
    console.log(data.img)
    console.log(typeof data.img)
  }

  if (data['query'] == 'signout') {
    res.json({status: 1})
  }

  if (data['query'] == 'changePassword'){
    res.json({status:1})
  }

  if (data['query'] == 'changeName'){
    let response = {
      status:1
    }
    res.json(response)
  }

  if (data['query'] == 'getRecent') {
    let response = {
      status: 1,
      data: {
        products: [
          {
            itemId: 1, //商品的id
            itemTitle: 'html', //商品的标题
            launchDate: '2018-03-12', //发布时间
            price: 30, //单价
            pictureAddress: 'http://localhost:3001/1.png', //图片地址
          }, {
            itemId: 2, //商品的id
            itemTitle: 'css', //商品的标题
            launchDate: '2018-03-12', //发布时间
            price: 20, //单价
            pictureAddress: 'http://localhost:3001/2.png', //图片地址
          }, {
            itemId: 3, //商品的id
            itemTitle: 'json', //商品的标题
            launchDate: '2018-03-13', //发布时间
            price: 32, //单价
            pictureAddress: 'http://localhost:3001/3.png', //图片地址
          }, {
            itemId: 4, //商品的id
            itemTitle: 'what', //商品的标题
            launchDate: '2018-03-12', //发布时间
            price: 30, //单价
            quantity: 1, //库存
            pictureAddress: 'http://localhost:3001/4.png', //图片地址
          }
        ]
      }
    }
    res.json(response)
  }

  if (data['query']=='check'){
    res.json({status:1})
  }

  if (data['query'] == 'search') {
    let item_list = [
      {
        itemId: 1, //商品的id
        itemTitle: 'html', //商品的标题
        launchDate: '2018-03-12', //发布时间
        price: 30, //单价
        pictureAddress: 'http://localhost:3001/1.png', //图片地址
      }, {
        itemId: 2, //商品的id
        itemTitle: 'css', //商品的标题
        launchDate: '2018-03-12', //发布时间
        price: 20, //单价
        pictureAddress: 'http://localhost:3001/2.png', //图片地址
      }, {
        itemId: 3, //商品的id
        itemTitle: 'json', //商品的标题
        launchDate: '2018-03-13', //发布时间
        price: 32, //单价
        pictureAddress: 'http://localhost:3001/3.png', //图片地址
      }, {
        itemId: 4, //商品的id
        itemTitle: 'what', //商品的标题
        launchDate: '2018-03-12', //发布时间
        price: 30, //单价
        quantity: 1, //库存
        pictureAddress: 'http://localhost:3001/4.png', //图片地址
      }
    ]
    let response = {
      status:1,
      data:{
        item_list:item_list
      }
    }
    res.json(response)
  }

  if (data['query'] == 'getItemDetail') {
    let products = [
      {
        itemId: 1, //商品的id
        itemTitle: 'html', //商品的标题
        bookName: 'HTML', //书名
        author: 'w3school', //作者
        press: 'w3school', //出版社
        publicationTime: '2018-01', //出版时间
        sellerId: 'w3school', //卖家
        freePostage: 0, //是否包邮,0/1
        launchDate: '2018-03-12', //发布时间
        description: '真的好', //描述
        price: 30, //单价
        quantity: 1, //库存
        pictureAddress: 'http://localhost:3001/1.png', //图片地址
      }, {
        itemId: 2, //商品的id
        itemTitle: 'css', //商品的标题
        bookName: 'css', //书名
        author: 'w3school', //作者
        press: 'w3school', //出版社
        publicationTime: '2018-01', //出版时间
        sellerId: 'w3school', //卖家
        freePostage: 1, //是否包邮,0/1
        launchDate: '2018-03-12', //发布时间
        description: '真的好', //描述
        price: 20, //单价
        quantity: 2, //库存
        pictureAddress: 'http://localhost:3001/2.png', //图片地址
      }, {
        itemId: 3, //商品的id
        itemTitle: 'json', //商品的标题
        bookName: 'json', //书名
        author: 'w3school', //作者
        press: 'w3school', //出版社
        publicationTime: '2018-03', //出版时间
        sellerId: 'w3school', //卖家
        freePostage: 0, //是否包邮,0/1
        launchDate: '2018-03-13', //发布时间
        description: '真的好', //描述
        price: 32, //单价
        quantity: 3, //库存
        pictureAddress: 'http://localhost:3001/3.png', //图片地址
      }, {
        itemId: 4, //商品的id
        itemTitle: 'what', //商品的标题
        bookName: 'what', //书名
        author: 'w3school', //作者
        press: 'w3school', //出版社
        publicationTime: '2018-01', //出版时间
        sellerId: 'w3school', //卖家
        freePostage: 0, //是否包邮,0/1
        launchDate: '2018-03-12', //发布时间
        description: '真的好', //描述
        price: 30, //单价
        quantity: 1, //库存
        pictureAddress: 'http://localhost:3001/4.png', //图片地址
      }
    ]
    let id = data.data.itemId;
    let response = {
      status: 1,
      data: {
        product: products[id - 1]
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
  if (data['query'] == 'register') {
    let response = {
      status: 1,
      err: "数据库访问失败"
    }

    // console.log(response)
    res.json(response)
  }

  if (data['query'] == 'getAddress') {
    response = {
      status: 1, //1是成功，0是失败
      data: {
        addresses: addresses
      }

    }
    // console.log(response)
    res.json(response)
  }

  if (data['query'] == 'addAddress') {
    let newAddress = {
<<<<<<< HEAD
      recipentName:data.data['recipentName'],
      phoneNumber:data.data['phoneNumber'],
      addressDetail:data.data['addressDetail'],
      province:data.data['province'],
      city:data.data['city'],
      default:false,
      addressId:888
=======
      recipientName: data.data['recipientName'],
      phoneNumber: data.data['phoneNumber'],
      addressDetail: data.data['addressDetail'],
      default: false,
      addressId: 888
>>>>>>> 8e94333f8e72efd30158450d6a44cf5f0727ec32
    }
    addresses.push(newAddress)
    console.log(addresses)
    response = {
      status: 1, //1是成功，0是失败
      err: '',
      data: {
        addresses: addresses
      }

    }
    console.log(response)
    res.json(response)
  }

  if (data['query'] == 'deleteAddress') {

    let addressId = data.data.addressId
    function isDelete(element) {
      return element.addressId != addressId
    }
    addresses = addresses.filter(isDelete)
    console.log(addresses)
    response = {
      status: 1, //1是成功，0是失败
      err: '',
      data: {
        addresses: addresses
      }

    }
    // console.log(response)
    res.json(response)
  }

  if (data['query'] == 'editAddress') {

    let addressId = data.data.addressId;

    addresses.forEach(element => {
      if (element.addressId == data.data.addressId) {
        element.recipientName = data.data.recipientName
        element.phoneNumber = data.data.phoneNumber,
        element.addressDetail = data.data.addressDetail,
        element.province = data.data.province,
        element.city = data.data.city,
        element.isDefaultAddress = data.data.isDefaultAddress
      }
    });
    console.log(addresses)
    response = {
      status: 1, //1是成功，0是失败
      err: '',
      data: {
        addresses: addresses
      }

    }
    // console.log(response)
    res.json(response)
  }

  if (data['query'] == 'register') {
    response = {
<<<<<<< HEAD
        status:1,//1是登录成功，0是登录失败
        data :{
            userId:1,//该用户的用户id
            userName:'tester',//该用户的昵称
            sessionId:'asdfghjkl',//登录成功的时候返回这次登录的session_id
            err:'',//登录失败的时候返回出错原因
        }
=======
      status: 1, //1是登录成功，0是登录失败
      data: {
        user_id: 1, //该用户的用户id
        name: 'tester', //该用户的昵称
        session_id: 'asdfghjkl', //登录成功的时候返回这次登录的session_id
        err: '', //登录失败的时候返回出错原因
      }
>>>>>>> 8e94333f8e72efd30158450d6a44cf5f0727ec32

    }
    res.json(response)
  }

  if(data['query']=='getShoppingCarList'){
    response = {
      status:1,//1是登录成功，0是登录失败
      data :{
        shoppingCarList : tableData
      },
      err :''
    }
    res.json(response)
  }

});

app.listen(3001);
