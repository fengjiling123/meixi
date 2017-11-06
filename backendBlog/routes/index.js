var express = require('express');
var router = express.Router();

var artical=require("../model/artical")

/* GET home page. */

//有用户登录时 查询当前用户发布的所有信息 倒序 渲染到主页面
//




router.get('/pagination', function(req, res, next) {
    if (req.session.userinfo) {  
        artical.find({author:req.session.userinfo.name},{},{limit:10,skip:0}).sort({_id:-1}).then((result)=>{
           // console.log(result)
             res.render('index', { CurrentUser: req.session.userinfo.name, unLogin: false, list: result});
        })       
    } else {
        res.redirect('/login')
       // res.render('index', { unLogin: true, CurrentUser: req.session.userinfo });
    }

});


router.get('/', function(req, res, next) {    
    if (req.session.userinfo) {
        console.log(req.session.userinfo)
        if(req.query.limit&&req.query.offset){
            console.log(req)
            artical.find({author:req.session.userinfo.name},{},{limit:parseInt(req.query.limit),skip:parseInt(req.query.offset)}).sort({_id:-1}).then((result)=>{
               // console.log(result)
                artical.find({author:req.session.userinfo.name}).sort({_id:-1}).then((allResult)=>{
                   // console.log(result)
                     res.render('index', { CurrentUser: req.session.userinfo.name, unLogin: false, listAll: allResult,list:result});
                })  
            
            })
        }else{
            artical.find({author:req.session.userinfo.name},{},{limit:10,skip:0}).sort({_id:-1}).then((result)=>{
               // console.log(result)
                artical.find({author:req.session.userinfo.name}).sort({_id:-1}).then((allResult)=>{
                   // console.log(result)
                     res.render('index', { CurrentUser: req.session.userinfo.name, unLogin: false, listAll: allResult,list:result});
                })  
            
            })
            
        }       
    } else {
        res.redirect('/login')
       // res.render('index', { unLogin: true, CurrentUser: req.session.userinfo });
    }

});



//退出登录
router.get("/logout", function(req, res) {
    req.session.destroy(function() {
        res.redirect('/login')
    })
})




module.exports = router;