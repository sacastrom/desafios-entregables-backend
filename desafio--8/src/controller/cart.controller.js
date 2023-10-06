import { cartsDao } from "../dao/index.js";

async function getCarts(req, res) {
  try {
    let response = await cartsDao.getCarts();
    const limit = req.query.limit || response.length;
        const cartsLimit = response.slice(0, limit);
    res.json({ data: response });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
}

async function createCart(req, res) {
  try {
    await cartsDao.save();
    res.send({ status: "success", message: "Carrito agregado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}

async function getCartByID(req, res) {
  try {
    const id = req.params.cid;
    let cart = await cartsDao.getCartById(id);
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
}

async function addProductToCart(req, res) {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    await cartsDao.saveProductToCart(idCart, idProduct);
    res.send({ status: "success", message: "Producto agregado al carrito" });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "Error",
      message: error.message,
    });
  }
}

async function updateProducts(req, res) {
  try {
    const idCart = req.params.cid;
    const data = req.body.products;
    await cartsDao.updateProductsFromCart(idCart, data);
    res.send({
      status: "success",
      message: "Producto actualizados en el carrito",
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      status: "Error",
      message: error.message,
    });
  }
}

async function updateQuantity(req, res) {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const newQuantity = req.body.quantity;

    // Verificar los IDs del carrito y el producto y realizar las validaciones necesarias

    // Actualizar la cantidad de ejemplares del producto en el carrito
    const updatedCart = await cartsDao.updateProductQuantity(
      cartId,
      productId,
      newQuantity
    );

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
}

async function deleteCart(req, res) {
  try {
    const id = req.params.cid;
    await cartsDao.delete(id);
    res.send({ status: "success", message: "Carrito eliminado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    await cartsDao.deleteProductFromCart(idCart, idProduct);
    res.send({ status: "success", message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}

export {
  getCarts,
  createCart,
  getCartByID,
  addProductToCart,
  updateProducts,
  updateQuantity,
  deleteCart,
  deleteProduct,
};
