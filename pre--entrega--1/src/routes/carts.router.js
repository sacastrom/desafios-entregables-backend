import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();

const cartManager = new CartManager("carritos.json");

router.get("/", async (req, res) => {
  try {
    let response = await cartManager.getCarts();
    const limit = req.query.limit || response.length;
    const cartsLimit = response.slice(0, limit);
    res.json({ data: cartsLimit });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const id = parseInt(req.params.cid);
    let cart = await cartManager.getCartById(id);
    console.log(cart);

    if (cart) {
      res.json({ data: cart });
    } else {
      res.json({
        message: "el carrito solicitado no existe",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res.send({ status: "success", message: "Carrito agregado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid);
    const idProduct = parseInt(req.params.pid);
    await cartManager.addProductToCart(idCart, idProduct);
    res.send({ status: "success", message: "Producto agregado al carrito" });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "Error",
      message: error.message,
    });
  }
});

export default router;
