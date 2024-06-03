import mongoose from "mongoose";

const connectDb =() => mongoose.connect("mongodb+srv://cimonew833:nigb9AgzwbLb0L4M@cluster0.gq9c6ry.mongodb.net/Lyrics-Finder?retryWrites=true&w=majority&appName=Cluster0").
then(rslt =>console.log(rslt.connection.host)).
catch(err=>console.log(`err:${err}`))

export default connectDb