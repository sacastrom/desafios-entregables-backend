import { Router } from "express";

import {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/products.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductByID);

router.post("/", createProduct);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;
