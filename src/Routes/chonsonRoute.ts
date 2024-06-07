
import express from 'express';
import { createChonson,getChonsonLyrics,getAllChonson,updateChonsonLyrics,deleteChonsonLyrics } from '../Controllers/chonsonController'; 
import {validatorChanson} from "../helpers/validator/chonsonValidator"
import {protect,allowedTo} from "../Middleware/authMiddleware";
const router = express.Router({mergeParams:true});

router.post('/',protect,allowedTo(true),validatorChanson, createChonson);
router.get('/:id',protect,allowedTo(false),getChonsonLyrics)
router.get('/',protect,allowedTo(false),getAllChonson)
router.put('/:id',protect,allowedTo(true),updateChonsonLyrics);
router.delete('/:id',protect,allowedTo(true),deleteChonsonLyrics);

export default router;
