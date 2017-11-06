var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var obj={
	name:String,
	tel:String,
	email:String,
	password:String,
	createTime:{
		type:Date,
		default:Date.now
	}
}

var model=mongoose.model("clientuser",new Schema(obj))
module.exports=model