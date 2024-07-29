const express = require("express");
const router = express.Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
// Accept: Specifies the media types that the client is willing to receive from the server. In this case, it accepts JSON, plain text, and any other type (*/*).
//signup

router.use(express.json())
router.post("/sign-up", async (req, res) => {
  try {
    const { userName, email, password, address } = req.body;
    //check username lengthis more than 4
    if (userName.length < 4) {
      return res
        .status(400)
        .json({ message: "user name should be of length greater than 3 " });
    }
    //check userbame already exist
    const existingUsername = await User.findOne({ userName: userName });
    if (existingUsername) {
      return res.status(400).json({ message: "user name already exists " });
    }
    const existingemail = await User.findOne({ email: email });
    if (existingemail) {
      return res.status(400).json({ message: "email  already exists " });
    }
    //check password length
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password should be of length greater than 5 " });
    }
    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, email, password: hashPass, address });
    await newUser.save();
    return res.status(200).json({ message: "Sign up is Sucessfull " });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal Server Error" });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await User.findOne({ userName });
    if (!existingUser) {
      res.status(400).json({ message: "invalid credentials" });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUser.userName },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookstore123", {
          expiresIn: "30d",
        });
        return res
          .status(200)
          .json({
            id: existingUser._id,
            role: existingUser.role, 
            token: token,
          });
      } else {
        return res.status(400).json({ message: "invalid credentials" });
      }
    });
    // const isMatch = await bcrypt.compare(password, existingUser.password);
    // if (isMatch) {
    //   return res.status(200).json({ message: "Sign in successful" });
    // } else {
    //   return res.status(400).json({ message: "Invalid credentials" });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal Server Error" });
  }
});
//get-user -information
// router.get("/get-user-information", authenticateToken, async (req, res) => {
//   try {
//     const { id } = req.headers;
//     const data = await User.findById(id);
//     console.log(id, "id");
//     console.log(data,"data")
//     return res.status(200).json({ data: data });
//   } catch (err) {
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// });
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    console.log("User ID:", id);

    const data = await User.findById(id);
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.status(200).json({ data: data });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "address update successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
