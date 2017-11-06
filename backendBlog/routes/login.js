var express = require('express')
var router = express.Router()
var md = require('md5')
var user = require("../model/user")

//渲染到登录页面
router.get('/', function(req, res) {
    res.render('login', { loginShow: false })
})

//登录 
router.post("/", function(req, res) {
    //console.log(req.body)

    user.find({ email: req.body.email, password: md(req.body.password) }).then((result) => {
        if (result.length > 0) {
            //console.log(result)
            //res.cookie("CurrentUser",result[0].name)
            //console.log(req.session)

            req.session.userinfo = result[0]
            //console.log(req.session)
            //登录成功后重定向到主页面
            res.redirect('/')
        } else {
            //登录失败渲染到登录页面
            res.render('login', { loginShow: true })
        }
    })
})

module.exports = router