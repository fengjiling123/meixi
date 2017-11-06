//创建模型，建立数据库中一个集合与对象的映射
//做一个概要计划，计划往数据库中存那些信息

var mongoose = require("mongoose")

//概要计划
Schema = mongoose.Schema

//var nowDate=date.toLocaleString()
//设置域（field）域格式
var obj = {
    name: {
        type: String,
        required: true //required:true 必填
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now //有default 属性表示自动创建
    }
}

//数据库中自动生成users集合
//new Schema(obj) 概要计划的实例对象 传入obj 设置数据库中存储的字段与数据类型
var model = mongoose.model("user", new Schema(obj))

module.exports = model