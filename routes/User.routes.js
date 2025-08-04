const express=require("express")
const { register, login, logout } = require("../controllers/User.controllers")
const route=express.Router()

route.post('/register',register)
route.post('/login',login)
route.post('/logout',logout)
module.exports=route