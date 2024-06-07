import express from 'express';
import useRoute  from "./Routes/userRoute"
import connectDb from "./config/configDb"
import dotenv from "dotenv"
import ApiError from './helpers/ApiError';
import cron from "node-cron"
import userAbonnerModel from './Models/abonneModel';
import {sendEmail} from './helpers/nodeMailler'
import userModel from 'Models/userModel';


dotenv.config()
const app = express()


connectDb()

app.use(express.json())
app.use("/user",useRoute)


cron.schedule('*/1 * * * *',async()=>{
const userAbonner=  await userAbonnerModel.find()
 const userEmail:any= userAbonner.map((item:any)=> item.email).toString()
 sendEmail({
   recipients :userEmail, 
   subject :"newLetter",
   message :"newLetter"
 })
  
})

app.all("*" ,(req,res,next)=>{
  next(new ApiError(`Can't find ${req.originalUrl} on this server`,404))
})

app.use((err:any,req:any,res:any,next:any)=>{
  err.statusCode = err.statusCode || 500 
  err.status = err.status || "error"
  res.status(err.statusCode).json({
      statusCode : err.statusCode,
      status :err.status,
      message:err.message,
      stack : err.stack
  })
})


app.listen(8080,()=>{
  console.log('server is running on port 8080')
})

