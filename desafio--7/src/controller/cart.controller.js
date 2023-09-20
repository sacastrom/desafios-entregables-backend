import { cartsDao } from "../dao/index.js";

async function getCarts(req, res) {
    try {
        let response = await cartsDao.getAll();
        /* const limit = req.query.limit || response.length;
        const cartsLimit = response.slice(0, limit); */
        res.json({ data: response });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ status: "Error", message: "Error interno del servidor" });
      }
}

async function createCart(req,res) {
    try {
        await cartsDao.save();
        res.send({ status: "success", message: "Carrito agregado" });
      } catch (error) {
        console.error(error);
        res.status(400).send({ status: "Error", message: error.message });
      }
}

async function getCartByID(req,res) {
    try {
        const id = req.params.cid;
        let cart = await cartsDao.getById(id);
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

async function addProductToCart(req, res){
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

export {getCarts, createCart, getCartByID, addProductToCart}