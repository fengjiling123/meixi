var express=require("express")
var router=express.Router()
var comment=require("../model/comment")

router.get('/',function(req,res){
	//console.log(req.query.id)
	comment.find({pro_id:req.query.id}).then(result=>{
		//console.log(result)
		comment.find({pro_id:req.query.id}).count().then(count=>{
			res.render('comment',{list:result,count:count})
		})
		
	})

	


	
})



router.get('/delete',function(req,res){
	//console.log(req.query.id)
	comment.findByIdAndRemove({_id:req.query.id}).then(result=>{
		res.redirect('/')
	})
})

module.exports=router 

   