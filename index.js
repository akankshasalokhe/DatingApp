const express=require('express')
const dotenv=require('dotenv')
const connectDB=require('./config/db.js')
const authRoute=require('./routes/authRoute.js')
const giftRoutes= require('./routes/giftRoutes.js')
const giftCategoryRoutes = require('./routes/giftCategoryRoutes.js')
const path = require('path')


const cors=require('cors')
dotenv.config()
connectDB()
const app=express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth",authRoute)
app.use("/api/gifts",giftRoutes)
app.use("/api/categories",giftCategoryRoutes)

app.get("/",(req,res)=>{
    res.send("Welcome to the Backend API")
})

module.exports = app;