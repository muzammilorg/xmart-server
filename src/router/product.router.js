import express from 'express'
import Products from '../controllers/product.controller.js';
import upload from '../middleware/multer.middleware.js';
import { authMiddleware, checkAdminMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', authMiddleware, checkAdminMiddleware, upload.array("images", 6), Products.create)
router.delete('/remove/:id', authMiddleware, checkAdminMiddleware, Products.remove)
router.patch('/update/:id', authMiddleware, checkAdminMiddleware, upload.array("images", 6), Products.update)
router.get('/all', Products.getAll)

export default router;