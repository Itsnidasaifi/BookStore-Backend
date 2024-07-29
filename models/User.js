const mongoose = require('mongoose')
const timestamps=require('mongoose-timestamps')
const Schema =mongoose.Schema;
const user = new Schema({
    userName:{ type:String ,required:true },
    email:{ type:String ,required:true ,unique:true},
    password:{ type:String ,required:true },
    address:{ type:String ,required:true },
    avatar:{ type:String ,default:'https://thenounproject.com/icon/profile-1995041/' },
    role:{ type:String ,default:'user' ,enum:['user','admin'] },
    favourites:[{ type:mongoose.Types.ObjectId ,ref:"books" }],
    cart:[{ type:mongoose.Types.ObjectId ,ref:"books" }],
    orders:[{ type:mongoose.Types.ObjectId ,ref:"order" }],

    // course:{type:Schema.Types.ObjectId,ref:'Course',required:true},
    
    
    


})
user.plugin(timestamps,{index:true});
module.exports=mongoose.model('user',user)
