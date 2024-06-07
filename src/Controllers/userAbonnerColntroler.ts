import userAbonnerModel from "../Models/abonneModel";
import asyncHandler from 'express-async-handler'

export const abonnerUserControler = asyncHandler(async(req:any,res:any)=>{
    const user : any = req.user
    console.log(user)
    const abooner = await userAbonnerModel.create({
        userId:user._id,
        email:user.email,
        firstName :user.firstName
    })
    res.status(200).json({
        message:"abonner created successfully",
        abooner
    })

})

export const DesabonnerUserControl = asyncHandler(async(req:any , res:any)=>{
    const user : any = req.user
    await userAbonnerModel.findOneAndDelete({userId:user._id
        })
        
            res.status(200).json({  
                message:"abonner deleted successfully"
                })
})
