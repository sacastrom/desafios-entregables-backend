import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();

const productManager = new ProductManager("productos.json");
let products = await productManager.getProducts();

router.get("/", (req, res) => {
  try {
    res.render("index", { products, style: "style.css" });
  } catch {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
});

export default router;
