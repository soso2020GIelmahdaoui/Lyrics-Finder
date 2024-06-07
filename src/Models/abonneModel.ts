import mongosse from "mongoose"

const userAboonerSchema = new mongosse.Schema({
    firstName :{
        type:String,
        required:true
    },
   email :{
       type:String,
       required:true,
       unique:true
    },
    userId :{
        type: mongosse.Schema.ObjectId,
        ref:"User",
    }

},{
    timestamps:true
})

const userAbonnerModel = mongosse.model("UserAbonner",userAboonerSchema)
export default userAbonnerModel
