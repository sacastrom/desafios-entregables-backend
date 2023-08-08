import { Router } from "express";
//import ProductManager from '../dao/fileManagers/productManager.js';
//import productsModel from "../dao/models/product.js";
import Products from "../dao/dbManagers/product.js"

const router = Router();

//const productManager = new ProductManager("productos.json");
const products = new Products();

router.get("/", async (req, res) => {
  try {
    const response = await products.getAll();
    res.json({ message: "Aquí mostrara los productos", data: response });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    let product = await products.getById(id);
    console.log(product);

    if (product) {
      res.json({ data: product });
    } else {
      res.json({
        message: "el producto solicitado no existe",
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
    let newProduct = req.body;
    await products.save(newProduct);
    res.send({ status: "success", message: "Producto agregado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const updatedFields = req.body;
    await products.update(id, updatedFields);
    res.send({ status: "Success", message: "Producto actualizado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    await products.delete(id);
    res.send({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
});

/* router.get("/", async (req, res) => {
  try {
    let response = await productManager.getProducts();
    const limit = req.query.limit || response.length;
    const productsLimit = response.slice(0, limit);
    res.json({ data: productsLimit });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
}); */

/* router.get("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    let product = await productManager.getProductById(id);
    console.log(product);

    if (product) {
      res.json({ data: product });
    } else {
      res.json({
        message: "el producto solicitado no existe",
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
    let newProduct = req.body;
    await productManager.addProduct(newProduct);
    res.send({ status: "success", message: "Producto agregado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}); */

/* router.put("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    const updatedFields = req.body;
    await productManager.updateProduct(id, updatedFields);
    res.send({ status: "Success", message: "Producto actualizado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}); */

/* router.delete("/:pid", async (req, res) => {
  try {
    const id = parseInt(req.params.pid);
    await productManager.deleteProductById(id);
    res.send({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}); */

export default router;
