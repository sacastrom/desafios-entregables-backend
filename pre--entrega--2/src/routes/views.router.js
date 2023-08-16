import { Router } from "express";
//import ProductManager from '../dao/fileManagers/productManager.js',
import Products from "../dao/dbManagers/product.js";
import Carts from "../dao/dbManagers/cart.js";

const router = Router();

/* const productManager = new ProductManager("productos.json");
let products = await productManager.getProducts(); */

const products = new Products();
const carts = new Carts();

router.get("/", async (req, res) => {
  try {
    const productos = await products.getAll();

    res.render("index", {
      productos,
      style: "style.css",
      script: "agregarProducto.js",
    });
    console.log(productos);
  } catch {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
});

router.get("/cart/:cid", async (req, res) => {
  const id = req.params.cid;
  try {
    const carrito = await carts.getById(id);
    console.log(carrito);
    if (carrito) {
      let productos = carrito.products;
      console.log("Productos en el carrito");
      console.log(productos);
      res.render("cart", { productos: productos });
    } else {
      res.send("Carrito no encontrado");
    }
  } catch (error) {
    //console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
});

export default router;
