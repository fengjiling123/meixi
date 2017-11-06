var express = require("express")
var router = express.Router()
//multer 中间件 用于处理 multipart/form-data 类型的表单数据
var multer  = require('multer')
var path=require("path")
//引入数据模型模块
var artical = require('../model/artical')
var comment=require("../model/comment")


//渲染artical 页面
router.get('/', function(req, res) {
    if (req.session.userinfo) {
        res.render('artical', { CurrentUser: req.session.userinfo.name, unLogin: false,title:"发布商品",isNew:true})
    } else {
        // res.render('artical', { CurrentUser: false, unLogin: true })
        //如果没有用户登录 重定向到登录页面
        res.redirect('/')
    }

})

//设置配置文件
var storage = multer.diskStorage({
    //设置上传后的文件路径
  destination: function (req, file, cb) {
    cb(null,'public/uploadImg')
  },
  //给上传后的文件重命名 加上时间戳后缀
  filename: function (req, file, cb) {
    cb(null, file.originalname + '_' + Date.now())
  }
})

//添加配置文件到multer 对象
var upload = multer({ storage: storage })


//发布信息
router.post('/',upload.single("image"),function(req, res) {
// req.file 是 （上传文件标签name名） 文件的信息
// req.body 将具有文本域数据，如果存在的话
    console.log(req.file)
    if (req.session.userinfo) {
        artical.create({
            author: req.session.userinfo.name,
            logo:req.body.logo,
            texture: req.body.texture,
            price:req.body.price,
            color:req.body.color,
            content: req.body.content,
            imagePath:`/uploadImg/${req.file.filename}`
        }).then((result) => {

                //res.redirect('artical')
                res.redirect('/')

            })
            //res.render('artical', { CurrentUser: false, unLogin: true }) res.render('artical', { CurrentUser: false, unLogin: true }))
        //res.render('index', {CurrentUser:req.session.userinfo.name,unLogin:false});

    } else {
        res.redirect("login")
    }

})

//点击标题获取详情信息 并跳转到详情页面
router.get('/detail',function(req,res){
    if(req.session.userinfo){     
        artical.find({
            _id:req.query.id
        }).then(result=>{
            comment.find({pro_id:req.query.id}).count().then(count=>{
                res.render("detail",{CurrentUser:req.session.userinfo.name,detail:result,count:count})
               // res.render('comment',{list:result,count:count})
            })
            
        })
        
    }else{
        res.redirect("/")
    }
   


})

//点击index页面的修改按钮 查询该条的详细信息 并跳转到修改页面 自动填入信息
router.get("/update",function(req,res){
    artical.find({_id:req.query.id}).then(detail=>{
            console.log(detail)
             res.render('artical', { detail:detail,CurrentUser: req.session.userinfo.name, unLogin: false,title:"修改商品信息",isNew:false})
        }
    
    )
})

//提交修改（自该页面）
router.post('/update',upload.single("image"),function(req,res){
    
    artical.findByIdAndUpdate({_id:req.body._id},{$set:{logo:req.body.logo,texture:req.body.texture,price:req.body.price,color:req.body.color,content:req.body.content,imagePath:`/uploadImg/${req.file.filename}`}}).then(result=>{
        res.redirect('/')
    })
})

//删除（index页面的操作）
router.get('/delete',function(req,res){
    artical.findByIdAndRemove({_id:req.query.id}).then(
        result=>{
            res.redirect("/")
        })
   
})






module.exports = router