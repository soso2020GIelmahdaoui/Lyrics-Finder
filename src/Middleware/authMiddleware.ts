import asyncHandler from 'express-async-handler'
import  Express  from 'express'
import jwt from 'jsonwebtoken'
import userModel from '../Models/userModel'

declare global{
  interface userData{
     firstName : string,
     lastName :string,
     email:string,
     isAdmin:boolean
     
  }
  namespace Express{
    interface Request{
      user: userData
    }
  }
}



export const protect = asyncHandler(async(req:Express.Request,res:Express.Response,next:Express.NextFunction)=>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith("Bear")){
    token = req.headers.authorization.split(" ")[1]
  }
  if(!token){
    res.status(400).json({
     message:"error"
    })
  }
  let decodedVerif ={
    userId:String
  }
  jwt.verify(token , process.env.jwt_web_key,(err:any,decoded:any)=>{
    if (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({
                message :'Token has expired'
            });
        }
        return res.status(400).json({
            message :'Failed to authenticate token'
        });
    }
    decodedVerif = decoded
  })
 
  let currentUser = await userModel.findById(decodedVerif.userId)
  if(!currentUser){
     res.status(401).json({
        message :"User not found"
    });
  }
 const currentUser2 = {
    lastName : currentUser.lastName,
    firstName : currentUser.firstName,
    email : currentUser.email,
    isAdmin :currentUser.isAdmin,
   }

  req.user = currentUser2
  next()
})

export const allowedTo=(admin:boolean)=> asyncHandler(async(req:any,res:any,next:any)=>{
    if(admin != req.user.isAdmin){
        return res.status(403).json({message:"You are not allowed to access this route"})
    }
     next()  
    })


