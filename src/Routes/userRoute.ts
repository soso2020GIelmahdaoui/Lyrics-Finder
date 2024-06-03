import express from "express"
import {addUserController} from "../Controllers/userController"
const router = express.Router()

router.route("/").post(addUserController)
export default router