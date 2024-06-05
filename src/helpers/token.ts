import jwt from 'jsonwebtoken'
const token = (payload:any) => jwt.sign({userId : payload},process.env.jwt_web_key,{ expiresIn:"1h"})
export default token