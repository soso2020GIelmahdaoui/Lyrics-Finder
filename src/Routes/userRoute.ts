import express from "express"
import {addUserController,loginController,forgotPassword,verifyPasswordResetCode,resetPassword,updateRoleUser} from "../Controllers/userController"
import {protect,allowedTo} from "../Middleware/authMiddleware"
import {userValidator} from "../helpers/validator/userValidator"
import {abonnerUserControler,DesabonnerUserControl} from "../Controllers/userAbonnerColntroler"
const router = express.Router()

router.route("/signup").post(userValidator,addUserController)
router.route("/login").post(loginController)
router.route("/updateRoleUser/:id").put(protect,allowedTo(true),updateRoleUser)
router.route("/abonner").post(protect,allowedTo(false),abonnerUserControler)
router.route("/desabonner").delete(protect,allowedTo(false),DesabonnerUserControl)
router.route("/forgotPassword").post(forgotPassword)
router.post('/verifyResetCode', verifyPasswordResetCode);
router.put('/resetPassword', resetPassword);
export default router