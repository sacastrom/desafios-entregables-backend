import { Router } from "express";

import Carts from "../dao/dbManagers/cartDao.js";

const router = Router();

const carts = new Carts();

router.get("/", async (req, res) => {
  try {
    let response = await carts.getAll();
    /* const limit = req.query.limit || response.length;
    const cartsLimit = response.slice(0, limit); */
    res.json({ data: response });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    await carts.save();
    res.send({ status: "success", message: "Carrito agregado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const id = req.params.cid;
    let cart = await carts.getById(id);
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

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    await carts.saveProductToCart(idCart, idProduct);
    res.send({ status: "success", message: "Producto agregado al carrito" });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "Error",
      message: error.message,
    });
  }
});

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

/* router.get("/", async (req, res) => {
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
}); */

/* router.get("/:cid", async (req, res) => {
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
}); */

/* router.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res.send({ status: "success", message: "Carrito agregado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}); */

/* router.post("/:cid/product/:pid", async (req, res) => {
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
}); */

export default router;
