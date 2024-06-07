import {validationResult} from "express-validator"


export const validatorError = (req:any, res:any , next:any) => {
   console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}