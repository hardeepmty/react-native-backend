const jwt = require("jsonwebtoken");
const User = require("../model/User.models");

const auth = async (req, res, next) => {
  const token = req.cookies.Token;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded._id).select("-password");

    if (!req.user) {
      return res.status(401).json({ msg: "User not found" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Token invalid or expired" });
  }
};

module.exports = auth;