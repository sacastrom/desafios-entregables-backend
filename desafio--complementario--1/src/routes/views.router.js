import { Router } from "express";
//import ProductManager from '../dao/fileManagers/productManager.js',
import Products from "../dao/dbManagers/product.js";

const router = Router();

/* const productManager = new ProductManager("productos.json");
let products = await productManager.getProducts(); */

const products = new Products();

router.get("/", async (req, res) => {
  try {
    const productos = await products.getAll();

    res.render("index", { productos, style: "style.css" });
    console.log(productos);
  } catch {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
});

export default router;
