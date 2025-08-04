const express=require("express")
const cors=require("cors")
require("dotenv").config()
const mongoConnect = require("./MongoDB")
const  route  = require("./routes/User.routes")
const dashboardRoutes = require("./routes/dasboard")
const cookieParser = require('cookie-parser'); 

const app=express()
app.use(cookieParser());
app.use(express.json())
app.use(cors())
app.use('/',route)
app.use('/api/dashboard', dashboardRoutes);
mongoConnect()
app.listen(process.env.PORT,()=>{
    console.log(`Server run on port ${process.env.PORT}`);
})
