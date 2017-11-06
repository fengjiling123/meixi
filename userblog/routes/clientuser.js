var express=require('express')
var clientuser=require('../model/clientuser')

var router=express.Router()
var md=require('md5')


router.get('/',function(req,res){
	res.send('clientusers')
})


router.post('/register',function(req,res){
	clientuser.find({"$or":[{tel:req.body.tel},{email:req.body.email}]}).then(result=>{
		if(result.length>0){
			res.send('手机号或邮箱已注册')
		}else{

			return	clientuser.create({
					name:req.body.name,
					tel:req.body.tel,
					email:req.body.email,
					password:md(req.body.password)
				})
		}

	}).then(result=>{
			res.send(result)
		})
	
})

router.post('/login',function(req,res){
	//req.session.currentUser=req.body.
	//console.log(req.body.tel)
	clientuser.find({tel:req.body.tel,password:md(req.body.password)}).then(result=>{
		//登陆成功后保存当前用户名
		console.log(result)
		if(result.length>0){
			req.session.currentUser=result[0].name
			res.send(result)
		}else{
			res.send('error')
		}
		
	})
	//res.send('login')
})


router.post('/unLogin',function(req,res){
	req.session.destroy(function(){
		res.send('unLogin')
	})
})

router.post('/getLoginUser',function(req,res){	
	if(req.session.currentUser){		
		res.send(JSON.stringify({currentUser:req.session.currentUser}))
	}else{
		res.send('error')
	}	
})
module.exports=router