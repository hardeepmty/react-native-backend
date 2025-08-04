const bcrypt = require("bcrypt");
const User = require("../model/User.models");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.send({ status: 0, msg: "All Fields are Required" })
    }
    const existing = await User.findOne({ email });
    if (existing)
         return res.send({ status: 0, msg: "Email already exists" });
    const hashPass = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashPass })
    user.save()
        .then((data) => {
            return res.send({ status: 1, msg: data })
        })
        .catch((err) => {
            return res.send({ status: 0, msg: err })
        })
}
const login = async (req, res) => {
   try{
     const { email, password } = req.body
    if (!email || !password) {
        return res.send({ status: 0, msg: "All Fields are Required" })
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.send({ status: 0, msg: "User not Found" })
    }
    const compPass = await bcrypt.compare(password, user.password)
    if (!compPass) {
        return res.send({ status: 0, msg: "Invalid Password" })
    }
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
    res.cookie("Token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "Production"
    })
    return res.send({ status: 1, msg: "User Login Successfully",user: {
          name: user.name,
          email: user.email,
        }, })
   }
   catch(err){
    console.log(err);
    
   }
}
const logout = async (req, res) => {
    try {
        const a = await res.clearCookie("Token")
        return res.send({ status: 1, msg: "User Logout Successfully" })
    }
    catch (err) {
        return res.send({ status: 0, msg: err.message })
    }
}
module.exports = { register, login, logout }