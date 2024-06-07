import { Router } from 'express';
import { getAllChansons, getChansonById, createChanson, updateChanson, deleteChanson } from '../Controllers/chansonController';
import {protect}  from '../Middleware/authMiddleware'; // authMiddleware  from '../middlewares/authMiddleware';

const router = Router();

router.get('/', getAllChansons);
router.get('/:id', getChansonById);
router.post('/new', createChanson);
router.put('/:id', protect, updateChanson);
router.delete('/:id', protect, deleteChanson);

export default router;
