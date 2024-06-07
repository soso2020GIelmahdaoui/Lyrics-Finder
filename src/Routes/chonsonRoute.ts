
import express from 'express';
import { createChonson,getChonsonLyrics,getAllChonson,updateChonsonLyrics,deleteChonsonLyrics } from '../Controllers/chonsonController'; 
import {validatorChanson} from "../helpers/validator/chonsonValidator"

const router = express.Router({mergeParams:true});

router.post('/',validatorChanson, createChonson);
router.get('/:name',getChonsonLyrics)
router.get('/',getAllChonson)
router.put('/:name',updateChonsonLyrics);
router.delete('/:name',deleteChonsonLyrics);

export default router;
