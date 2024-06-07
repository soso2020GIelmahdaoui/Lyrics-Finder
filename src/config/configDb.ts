import mongoose from "mongoose";

const connectDb =() => mongoose.connect("mongodb+srv://souad:987654321@cluster0.po6w0fs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").
then(rslt =>console.log(rslt.connection.host)).
catch(err=>console.log(`err:${err}`))


export default connectDb