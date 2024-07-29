const mongoose = require("mongoose");
const timestamps=require('mongoose-timestamps')
const Schema =mongoose.Schema;
const order = new Schema({
    user:{ type:mongoose.Types.ObjectId ,ref:"user" },
    book:{ type:mongoose.Types.ObjectId ,ref:"books" },
    status:{ type:String ,default:'Order Placed',enum:["out For delivery","delivered","Order Placed","Cancelled"] },
    
    


})
order.plugin(timestamps,{index:true});
module.exports=mongoose.model('order',order)
