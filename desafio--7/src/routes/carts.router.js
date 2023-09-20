import { Router } from "express";
import { getCarts, createCart, getCartByID, addProductToCart } from "../controller/cart.controller.js";

//import Carts from "../dao/mongo/cart.dao.js";

const router = Router();

//const carts = new Carts();

router.get("/", getCarts);

router.post("/", createCart);

router.get("/:cid", getCartByID);

router.post("/:cid/product/:pid", addProductToCart);

router.put("/:cid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const data = req.body.products;
    await carts.updateProductsFromCart(idCart, data);
    res.send({ status: "success", message: "Producto actualizados en el carrito" });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "Error",
      message: error.message,
    });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;

    // Verificar los IDs del carrito y el producto y realizar las validaciones necesarias

    // Actualizar la cantidad de ejemplares del producto en el carrito
    const updatedCart = await carts.updateProductQuantity(cartId, productId, newQuantity);

    res.send({
      status: "success",
      message: "Cantidad de ejemplares actualizada en el carrito",
      cart: updatedCart,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "Error",
      message: error.message,
    });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    await carts.delete(id);
    res.send({ status: "success", message: "Carrito eliminado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    await carts.deleteProductFromCart(idCart, idProduct);
    res.send({ status: "success", message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
});


export default router;
