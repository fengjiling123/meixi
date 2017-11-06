var mongoose = require("mongoose")

var Schema = mongoose.Schema;

var obj = {
	commentUser:String,
    pro_id: String,
   	eval: String,
    eval_content:String,
    createTime: {
        type: Date,
        default: Date.now
    }
}

var model = mongoose.model("comment", new Schema(obj))
module.exports = model