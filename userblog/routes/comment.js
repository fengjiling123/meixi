var express=require('express')
var router=express.Router()
var comment=require('../model/comment.js')
//pro_id: "59f98092710b9aa330aa76ab", eval: "很满意", eval_content: ""
router.get('/',function(req,res){
	if(req.session.currentUser){
		comment.create({
			commentUser:req.query.commentUser,
			pro_id:req.query.pro_id,
			eval:req.query.eval,
			eval_content:req.query.eval_content

		}).then(result=>{
			res.send(result)
		})
	}else{
		res.send('error')
	}		
})


router.get('/list',function(req,res){
	comment.find({pro_id:req.query.pro_id}).then(list=>{
		res.send(list)
	})
})



module.exports=router