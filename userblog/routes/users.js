var express = require('express');
var router = express.Router();
var artical=require("../model/artical")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
	var limit=parseInt(req.query.limit);
	var skip=parseInt(req.query.skip);
	var pageNum=skip/limit+1
	console.log(limit,skip)
	//分别进行限制条数的条件查询 与总数查询
    Promise.all([artical.find({},{},{limit:limit,skip:skip}),artical.count()]).then(result=>{
        res.send({
            total:result[1],
            list:result[0],
            pageNum:pageNum

        })
    })
});


router.post('/detail',function(req,res){
	artical.find({_id:req.body.id}).then(result=>{
		res.send(result)
	})
})




module.exports = router;
