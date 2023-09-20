import { Router } from "express";
//import ProductManager from '../dao/fileManagers/productManager.js',
import Products from "../dao/mongo/product.dao.js";
import Carts from "../dao/mongo/cart.dao.js";
import cartsModel from "../dao/mongo/models/cart.model.js";
import productsModel from "../dao/mongo/models/product.model.js";
import { showProducts, showCart } from "../controller/views.controller.js";

const router = Router();

/* const productManager = new ProductManager("productos.json");
let products = await productManager.getProducts(); */

const products = new Products();
const carts = new Carts();

router.get("/", showProducts);

router.get("/cart/:cid", showCart);

export default router;
