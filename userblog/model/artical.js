

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var obj = {
    author:String,
    logo:String,
    texture:String,
    price:String,
    color:String,
    content:String,
    imagePath:String,
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
    }


var obj2={
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
}



var model = mongoose.model("artical", new Schema(obj,obj2));

module.exports = model;
