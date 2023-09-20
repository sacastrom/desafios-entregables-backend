import { Router } from "express";
import {
  getCarts,
  createCart,
  getCartByID,
  addProductToCart,
  updateProducts,
  updateQuantity,
  deleteCart,
  deleteProduct,
} from "../controller/cart.controller.js";

const router = Router();


router.get("/", getCarts);

router.post("/", createCart);

router.get("/:cid", getCartByID);

router.post("/:cid/product/:pid", addProductToCart);

router.put("/:cid", updateProducts);

router.put("/:cid/product/:pid", updateQuantity);

router.delete("/:cid", deleteCart);

router.delete("/:cid/product/:pid", deleteProduct);

export default router;
