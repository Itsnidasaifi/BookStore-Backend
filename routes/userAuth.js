// const jwt = require('jsonwebtoken');
// const authenticateToken=(req,res,next)=>{
//     const authHeader=req.headers["authorization"];
//     const token =authHeader && authHeader.split(" ")[1];
//      if(token == null){
//         return res.status(401).json({messages:"authentication token required"});
//      }
//      jwt.verify(token,"bookStore123",(err,user)=>{
//         if(err){
//             return res.status(400).json({message:"token expired .please sign in again"});
//         }
//         req.user=user;
//         next();
//      })
// };
// module.exports={authenticateToken};


// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
  
//   if (!token) {
//     return res.status(401).json({ message: "Authentication token required" });
//   }

//   jwt.verify(token, "bookstore123", (err, user) => {
//     if (err) {
//       console.log("Token verification error:", err);
//       return res.status(403).json({ message: "Token expired or invalid. Please sign in again." });
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = { authenticateToken };
//  const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
  
//   if (!token) {
//     return res.status(401).json({ message: "Authentication token required" });
//   }

//   jwt.verify(token, "bookstore123", (err, user) => {
//     if (err) {
//       console.error("Token verification error:", err);
//       if (err.name === 'JsonWebTokenError') {
//         return res.status(403).json({ message: "Invalid token. Please sign in again." });
//       } else if (err.name === 'TokenExpiredError') {
//         return res.status(403).json({ message: "Token expired. Please sign in again." });
//       } else {
//         return res.status(500).json({ message: "Internal Server Error" });
//       }
//     }
//     req.user = user;
//     next();
//   });
// };

// module.exports = { authenticateToken };
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "bookstore123", (err, user) => {
    if (err) {
      console.error("Token verification error:", err);
      if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: "Invalid token. Please sign in again." });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: "Token expired. Please sign in again." });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
