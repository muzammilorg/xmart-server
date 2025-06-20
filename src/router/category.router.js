import express from 'express'
import Categories from '../controllers/category.controller.js'
import upload from '../middleware/multer.middleware.js';
import { authMiddleware, checkAdminMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router()
 
router.post('/create', authMiddleware, checkAdminMiddleware ,upload.single("image"), Categories.create)
router.get('/all', Categories.getAll)
router.delete('/:id', authMiddleware, checkAdminMiddleware ,Categories.deleteOne)


export default router;