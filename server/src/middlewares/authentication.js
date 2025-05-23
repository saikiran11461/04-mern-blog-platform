const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  
  const token = req.cookies?.token;
  
  
  if (!token) {
    return res
      .status(401)
      .json({ error: "No token found in cookies. Please login again." });
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Invalid or expired token. Please login again." });
    }


    req.user = decoded;
    next();
  });
};

module.exports = { authentication };
