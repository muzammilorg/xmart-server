import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import ReviewRating from "../controllers/review.controller.js";


const router = express.Router()

router.post('/create', authMiddleware, ReviewRating.create)
router.delete('/remove/:id', authMiddleware, ReviewRating.remove)
router.get('/product-reviews/:productId', ReviewRating.getProductRatings)


export default router;