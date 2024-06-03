import asyncHandler from 'express-async-handler'
import userModel from '../Models/userModel'



export const addUserController = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const user = await userModel.create(req.body)
    res.status(201).json({
        data :user
    })
})