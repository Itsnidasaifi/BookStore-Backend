const express = require("express");
const router = express.Router();
const { authenticateToken } = require("./userAuth");
const User = require("../models/User");
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart) {
      return res
        .status(200)
        .json({ status: "success", message: "Book is Already in your Cart" });
    }
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Book is Added to Cart" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });

    return res
      .status(200)
      .json({ status: "success", message: "Book is removed from  Cart" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
    return res.status(200).json({ status: "success", data: cart });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
