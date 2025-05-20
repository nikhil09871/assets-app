const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // your secret from .env
    req.userId = decoded.id || decoded._id; // decoded should contain user id and email
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;
