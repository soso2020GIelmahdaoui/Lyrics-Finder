import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import userModel from '../Models/userModel'
import token from '../helpers/token'
import Express  from 'express'
import crypto from "crypto"
import { sendEmail } from '../helpers/SMTP/nodeMailler'
import ApiError from '../helpers/ApiError'


export const addUserController = asyncHandler(async(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password)
    const user = await userModel.create(req.body)
    res.status(201).json({
        data :user
    })
})

export const loginController = asyncHandler(async(req:Express.Request,res:Express.Response,next:Express.NextFunction)=>{
    const user = await userModel.findOne({
        email : req.body.email
    })
    if(!user){
        return next(new ApiError("password or email wrong",400))
    }
    const passCompare = await bcrypt.compare(req.body.password , user.password)
    if(!passCompare){
        return next(new ApiError("password or email wrong",400))
    }
    const tokenL = token(user.id)
    res.status(200).json({
        user,
        token : tokenL
    })
})

export const forgotPassword = asyncHandler(async(req:any,res:any,next:any)=>{
    const user = await userModel.findOne({email:req.body.email})
    if(!user){
        return next(new ApiError("User not found",404))
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const hashResetCode = crypto.createHash('sha256').update(resetCode)
    .digest('hex');
       user.passwordResetCode = hashResetCode
       user.passwordResstExpired = new Date(Date.now() + 10 *60*1000) 
       user.passwordResetVerfied = false
       await user.save()
       const messageT:any = `Hi ${user.firstName},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
       
    try {
       await sendEmail({
        recipients:"vocoshope@gmail.com", 
        subject:'Your password reset code (valid for 10 min)', 
        message: typeof messageT
    })
    }catch(err){
      user.passwordResetCode = undefined
      user.passwordResstExpired = undefined
      user.passwordResetVerfied = undefined
      user.save()
        }
        res.status(200).json({
            message : "Password reset code sent to your email"
            })
})

export const verifyPasswordResetCode = asyncHandler(async(req,res,next)=>{
    const hashResetCode = crypto.createHash('sha256').update(req.body.resetCode)
    .digest('hex');
    const user = await userModel.findOne({
        passwordResetCode : hashResetCode,
        passwordResstExpired : {$gt : Date.now()},
    })
    if(!user){
        return next(new ApiError("Invalid or experated reset code",404))
    }
        user.passwordResetVerfied = true
        await user.save()
        res.status(200).json({
            message : "Password reset code verified"
            })
})

export const resetPassword = asyncHandler(async(req,res,next)=>{
    const user = await userModel.findOne({
        email:req.body.email,
        })
        if(!user.passwordResetVerfied){
          return next(new ApiError("Password reset code not verified",404))
        }
        user.password = req.body.newPassword
        user.passwordResetCode = undefined
        user.passwordResstExpired = undefined
        user.passwordResetVerfied = undefined
        await user.save()
        res.status(200).json({
            message : "Password reset successfully"
            })
})