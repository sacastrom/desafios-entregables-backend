import { Router } from "express";
//import ProductManager from '../dao/fileManagers/productManager.js',
import Products from "../dao/dbManagers/product.js";
import Carts from "../dao/dbManagers/cart.js";
import cartsModel from "../dao/models/cart.model.js";

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

router.get("/cart/:cid",async(req,res)=>{
  
  try {
    const id = req.params.cid;
    let cart = await cartsModel.findOne({_id: id }).lean()
      if (cart) {
          let productos = cart.products;
          console.log(productos)
          res.render("cart", { title: "Carrito", productos: productos });
      } else {
          res.send("Carrito no encontrado");
      }
  } catch (err) { 
      
      res.send("Error al cargar el carrito");
  }
})

export default router;
