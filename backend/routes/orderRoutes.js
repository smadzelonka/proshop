import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getOrders,
  updateOrderToDelievered,
} from "../controllers/orderControllers.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, updateOrderToDelievered);
router.route("/:id/pay").put(protect, admin, updateOrderToPaid);

export default router;
