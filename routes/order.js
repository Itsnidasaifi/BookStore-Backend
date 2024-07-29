const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const Book = require("../models/book");
const User = require("../models/User");
const { authenticateToken } = require("./userAuth");

// router.post("/place-order", authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.headers;
//     const { order } = req.body;
//     for (const orderData of order) {
//       const newOrder = new Order({ user: id, book: orderData._id });
//       const orderDataFromDb = await newOrder.save();
//       await User.findByIdAndUpdate(id, {
//         $push: { orders: orderDataFromDb._id },
//       });
//       await User.findByIdAndUpdate(id, {
//         $pull: { cart: orderData._id },
//       });
//       return res
//         .status(200)
//         .json({ Success: true, message: "Order Placed Successfully" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    if (!order || order.length === 0) {
      console.log("Order array is empty");
      return res.status(400).json({ message: "Order array is empty" });
    }

    const orderResults = [];

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });

      orderResults.push(orderDataFromDb);
    }

    console.log(`Order placed for user ${id}:`, orderResults);
    return res.status(200).json({ Success: true, message: "Order Placed Successfully", orders: orderResults });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    return res.status(200).json({ Success: true, data: ordersData });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.status(200).json({ Success: true, data: userData });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res
      .status(200)
      .json({ Success: true, message: "status updated Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
