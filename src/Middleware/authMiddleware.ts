import asyncHandler from 'express-async-handler'
import  Express  from 'express'
import jwt from 'jsonwebtoken'
import userModel from '../Models/userModel'
import ApiError from '../helpers/ApiError'

export const protect = asyncHandler(async(req:any,res:any,next:Express.NextFunction)=>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith("Bear")){
    token = req.headers.authorization.split(" ")[1]
  }
  if(!token){
    return  next(new ApiError("You are not  authorizid",400))
  }
  let decodedVerif ={
    userId:String
  }
  const tk:any =token
  const jwkey:any=process.env.jwt_web_key;
  jwt.verify(tk , jwkey,(err:any,decoded:any)=>{
    if (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({
                message :'Token has expired'
            });
        }
        return  next(new ApiError("Failed to authenticate token",400))
    }
    decodedVerif = decoded
  })
 
  let currentUser:any = await userModel.findById(decodedVerif.userId)
  if(!currentUser){
    return  next(new ApiError("user not found",401))
  }

  req.user = currentUser
  next()
})

export const allowedTo=(admin:boolean)=> asyncHandler(async(req:any,res:any,next:any)=>{
    if(admin != req.user.isAdmin){
      return  next(new ApiError("You are not allowed to access this route",403))
       
    }
     next()  
    })


