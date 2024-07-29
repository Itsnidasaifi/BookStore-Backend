const express= require('express');
const app= express();
const connect =require('./conn/connection')
require("dotenv").config();
const bodyParser = require('body-parser');
const cors= require('cors');


//create 
const user =require('./routes/user')
const book = require('./routes/book')
const cart= require('./routes/cart')
const favourite= require('./routes/favourite')
const order = require('./routes/order')
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(cors())
app.use(express.json())
app.use(user)
app.use(book)
app.use(favourite)
app.use(cart)
app.use(order)
connect();
app.listen(process.env.PORT,()=>{
    console.log(`server Started ${process.env.PORT}`)
});
