const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const timestamps= require('mongoose-timestamps')
const book= new Schema({
    url:{ type:String,required:true },
    title:{ type:String,required:true },
    author:{ type:String,required:true },
    price:{ type:Number,required:true },
    desc:{ type:String,required:true },
    language:{ type:String,required:true },
    
    


})
book.plugin(timestamps,{index:true});
module.exports=mongoose.model('books',book)
