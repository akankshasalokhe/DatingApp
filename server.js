const express = require('express')
const dotenv=require('dotenv')
const connectDB=require('./config/db.js')
const authRoute=require('./routes/authRoute.js')
const giftRoutes= require('./routes/giftRoutes.js')
const giftCategoryRoutes = require('./routes/giftCategoryRoutes.js')
const userCategoryRoute = require('./routes/userCategoryRoute.js')
const userSubCategoryRoute = require('./routes/userSubCategoryRoute.js')
const matchRoute = require('./routes/matchRoute.js')
const privacyPolicyRoute = require('./routes/privacyPolicyRoute.js');
const termsConditionRoute = require('./routes/termsConditionRoute.js');

const path = require('path')
const initSocket = require('./socket');
const http = require('http');


const cors=require('cors')
dotenv.config()
connectDB()

const app=express()
const server = http.createServer(app); // ✅ HTTP server for socket.io
initSocket(server);
app.use(cors())

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth",authRoute)
app.use("/api/userCategories",userCategoryRoute)
app.use("/api/userSubCategory",userSubCategoryRoute)
app.use("/api/gifts",giftRoutes)
app.use("/api/categories",giftCategoryRoutes)
app.use("/api/match",matchRoute)
app.use("/api/privacyPolicy",privacyPolicyRoute)
app.use("/api/termsAndConditions", termsConditionRoute);


app.get("/",(req,res)=>{
    res.send("Welcome to the Backend API")
})

const PORT=process.env.PORT || 2000

server.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`.bgMagenta)
})

module.exports = app;