import jwt from 'jsonwebtoken'
const token = (payload:any) => {
   const jwkey:any=process.env.jwt_web_key;
   return jwt.sign({userId : payload},jwkey,{ expiresIn:"1h"})
}
export default token