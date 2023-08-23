import { Router } from "express";
//import ProductManager from '../dao/fileManagers/productManager.js',
import Products from "../dao/dbManagers/product.js";
import Carts from "../dao/dbManagers/cart.js";
import cartsModel from "../dao/models/cart.model.js";
import productsModel from "../dao/models/product.model.js";

const router = Router();

/* const productManager = new ProductManager("productos.json");
let products = await productManager.getProducts(); */

const products = new Products();
const carts = new Carts();

router.get("/",async (req,res)=>{
  const {limit = 10, page = 1, sort, query} = req.query
  const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = await productsModel.paginate(query ? {category: query} : {},{limit, page, lean: true, sort: sort ? {price:1} : {price:-1}})
  res.render("index",{title: "Productos", 
  productos: docs,  
  hasPrevPage,
  hasNextPage,
  prevPage,
  nextPage,
  limit,
  sort,
  query,
  style: "style.css",
  script: "agregarProductos.js"
})
})

router.get("/cart/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    let cart = await cartsModel.findOne({ _id: id }).lean();
    let productos = cart.products;
      res.render("cart", { productos, style: "cart.css", script: "index.js" });
    /* if (cart) {
      let productos = cart.products;
      res.render("cart", { productos: productos, style: "cart.css" });
    } else {
      res.send("Carrito no encontrado");
    } */
  } catch (error) {
    
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
  }
);

export default router;
