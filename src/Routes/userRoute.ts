import express from "express"
import {addUserController,loginController,forgotPassword} from "../Controllers/userController"
import {protect,allowedTo} from "../Middleware/authMiddleware"
import {userValidator} from "../helpers/validator/userValidator"
const router = express.Router()

router.route("/signup").post(userValidator,addUserController)
router.route("/login").post(loginController)
router.route("/forgotPassword").post(forgotPassword)
export default router