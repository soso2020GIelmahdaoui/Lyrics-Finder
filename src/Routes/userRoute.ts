import express from "express"
import {addUserController,loginController,forgotPassword,verifyPasswordResetCode,resetPassword} from "../Controllers/userController"
import {protect,allowedTo} from "../Middleware/authMiddleware"
import {userValidator} from "../helpers/validator/userValidator"
import {abonnerUserControler,DesabonnerUserControl} from "../Controllers/userAbonnerColntroler"
const router = express.Router()

router.route("/signup").post(userValidator,addUserController)
router.route("/login").post(loginController)
router.route("/abonner").post(protect,abonnerUserControler)
router.route("/desabonner").delete(protect,DesabonnerUserControl)
router.route("/forgotPassword").post(forgotPassword)
router.post('/verifyResetCode', verifyPasswordResetCode);
router.put('/resetPassword', resetPassword);
export default router