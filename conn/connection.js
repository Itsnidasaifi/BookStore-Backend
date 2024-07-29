const mongoose = require('mongoose');
const connect= async()=>{
    try{
        await mongoose.connect(`mongodb://localhost:27017/RD-BookStore-Project`,({ useNewUrlParser:true }))
        console.log("database connected")

    }
    catch(err){
        console.log(err)

    }
}
module.exports=connect;