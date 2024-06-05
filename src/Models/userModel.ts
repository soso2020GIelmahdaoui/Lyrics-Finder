import mongosse from "mongoose"

const userSchema = new mongosse.Schema({
    firstName :{
        type:String,
        required:true
    },
    lastName :{
        type:String,
        required:true
    },
    email :{
       type:String,
       required:true,
       unique:true
    },
    passwordResetCode:String,
    passwordResstExpired :Date,
    passwordResetVerfied:Boolean,
    password : {
        type : String,
        required : true,
        minLenght : [6 , "password is too short"],
        
     },
    isAdmin :{
        type:Boolean,
        default : false
    }
},{
    timestamps:true
})

const userModel = mongosse.model("User",userSchema)
export default userModel
