const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/book");

// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
// add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const {id}=req.headers;
    const user= await User.findById(id)
    if(user.role!== "admin"){
        return res.status(400).json({message:"you do not have to perform admin work  "})
    }
    const book = new Book({
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    res.status(200).json({ message: "book added succcessfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//update book
router.put('/update-book',authenticateToken,async(req,res)=>{
    try{
        const {bookid}= req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
          });
          
          res.status(200).json({ message: "book updated succcessfully" });

    }
    catch(err){
        res.status(500).json({ message: "Internal Server Error" });

    }
})
router.delete('/delete-book',authenticateToken,async(req,res)=>{
   try{
    const {bookid} =req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({message:"book Deleted Successfully"})


   }
   catch(err){
    res.status(500).json({ message: "Internal Server Error" });
   }
})
router.get('/get-all-books',async(req,res)=>{
  try{
    const books =await Book.find().sort({createdAt:-1});
    return res.status(200).json({message:"book listed Successfully",data:books})

  }
  catch(err){
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.get('/get-recent-books',async(req,res)=>{
  try{
    const books =await Book.find().sort({createdAt:-1}).limit(4);
    return res.status(200).json({message:"book listed Successfully",data:books})

  }
  catch(err){
    res.status(500).json({ message: "Internal Server Error" });
  }
})


router.get('/get-book-by-id/:id',async(req,res)=>{
  try{
    const {id} =req.params;

    const book =await Book.findById(id);
    return res.status(200).json({message:"book details listed Successfully",data:book})

  }
  catch(err){
    res.status(500).json({ message: "Internal Server Error" });
  }
})


module.exports = router;
