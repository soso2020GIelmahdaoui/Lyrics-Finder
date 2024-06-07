import express from 'express';
import useRoute  from "./Routes/userRoute"
import connectDb from "./config/configDb"
import uploadim from './Routes/uploadRoute'
import artistRoute from './Routes/artistRoute'
import chonsonRoute from './Routes/chonsonRoute'
import dotenv from 'dotenv'
dotenv.config()



const app = express();
connectDb()

app.use(express.json())

app.use("/user",useRoute)
app.use("/apload",uploadim); 
app.use("/artist",artistRoute)
app.use("/chonson",chonsonRoute)
app.listen(8080,()=>{
  console.log('server is running on port 8080')
})

