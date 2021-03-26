import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopProduct,
} from "../controllers/productController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

// https://stackoverflow.com/questions/33617688/router-get-vs-router-route-get-in-express-js

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get("/top", getTopProduct);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
