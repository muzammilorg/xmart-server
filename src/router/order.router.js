import express from "express";
import { authMiddleware, checkAdminMiddleware } from "../middleware/auth.middleware.js";
import Orders from "../controllers/order.controller.js";


const router = express.Router()

router.post('/create', authMiddleware, Orders.create);
router.post('/handle-status', authMiddleware, checkAdminMiddleware, Orders.handleStatusByAdmin);
router.get('/all-orders', authMiddleware, checkAdminMiddleware, Orders.getOrders)

export default router;