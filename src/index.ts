import express from 'express';
import useRoute  from "./Routes/userRoute"
import connectDb from "./config/configDb"

const app = express()
connectDb()

app.use(express.json())

app.use("/user",useRoute)


app.listen(8080,()=>{
  console.log('server is running on port 8080')
})

