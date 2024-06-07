import { check } from "express-validator"
import userModel from "../../Models/userModel"
import {validatorError} from "../../Middleware/validatorError"

export const userValidator: any[] = [
    check("firstName").notEmpty().withMessage("firstName is required"),
    check("lastName").notEmpty().withMessage("lastName is required"),
    check("email").notEmpty().withMessage("email is required").
    isEmail().withMessage("must be email").custom(async(value)=>{
        const user = await userModel.findOne({email:value})
        if(user){
            throw new Error("Email already exists")
            }
       }),
    check("password").notEmpty().withMessage("password is required").
    isLength({min:6}).withMessage("password must be more than 6"),
    validatorError
]