import jwt from 'jsonwebtoken'
const token = (payload:any) => {
    console.log(`key :${process.env.smtp_host}`)
   return jwt.sign({userId : payload},process.env.jwt_web_key,{ expiresIn:"1h"})
}
export default token