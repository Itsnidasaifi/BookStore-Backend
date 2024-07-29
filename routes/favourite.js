const express = require("express");
const router = express.Router();
const User = require("../models/User");
// const Book = require("../models/book");

// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
//add Book to Favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    console.log("Request Headers:", req.headers);
    //console.log('Request Body:', req.body);

    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "book is already in favourites" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
      return res.status(200).json({ message: "book added to  favourites" });
    }
  } catch (err) {
    res.status(500).json({ message: "internal server Error" });
  }
});

// router.put(
//   "/delete-book-from-favourite",
//   authenticateToken,
//   async (req, res) => {
//     try {
//       const { bookid, id } = req.headers;
//       console.log("Request Headers:", req.headers);
//       //console.log('Request Body:', req.body);

//       const userData = await User.findById(id);
//       const isBookFavourite = userData.favourites.includes(bookid);
//       if (isBookFavourite) {
//         // return res.status(200).json({message:"book is already in favourites"})
//         await User.findByIdAndDelete(id, { $pull: { favourites: bookid } });
//       } else {
//         return res
//           .status(200)
//           .json({ message: "book removed from favourites" });
//       }
//     } catch (err) {
//       res.status(500).json({ message: "internal server Error" });
//     }
//   }
// );
router.put(
  "/delete-book-from-favourite",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      console.log("Request Headers:", req.headers);

      const userData = await User.findById(id);
      const isBookFavourite = userData.favourites.includes(bookid);

      if (isBookFavourite) {
        await User.findByIdAndUpdate(
          id,
          { $pull: { favourites: bookid } },
          { new: true } // This option returns the modified document
        );
        return res.status(200).json({ message: "Book removed from favourites" });
      } else {
        return res.status(404).json({ message: "Book not found in favourites" });
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);


router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    console.log(req.headers,'req.headers')
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    console.log(favouriteBooks)
    return res.json({ status: "success", data: favouriteBooks });
  } catch (err) {
    return res.status(500).json({ message: "internal server Error" });
  }
});

module.exports = router;
