import { Router } from "express";
//import ProductManager from '../dao/fileManagers/productManager.js'
import { socketServer } from "../app.js";
import Products from "../dao/dbManagers/productDao.js"

const router = Router();

/* const productManager = new ProductManager("productos.json");
let products = await productManager.getProducts(); */
const products = new Products();

router.get("/", async (req, res) => {
    try {
      const productos = await products.getAll();
      res.render("realTimeProducts", { productos, style: "realtime.css", script: "index.js" });
    } catch {
      console.error(error);
      res
        .status(500)
        .send({ status: "Error", message: "Error interno del servidor" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const formData = req.body; // Datos del formulario enviados en el cuerpo de la solicitud
      // Procesar los datos del formulario y guardarlos en el servidor o en una base de datos
      const newProduct = await products.save(formData);
  
      // Cargar los productos nuevamente después de agregar un nuevo producto
      const productos = await products.getAll();
  
      // Emitir el evento "nuevoProducto" con los datos del nuevo producto
      socketServer.emit("nuevoProducto", newProduct);
  
      res.json({ status: "success", message: "Datos guardados correctamente", productos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  });

  router.delete("/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      await products.delete(productId);
  
      // Cargar los productos nuevamente después de eliminar el producto
      const productos = await products.getAll();
  
      res.json({ status: "success", message: "Producto eliminado correctamente", productos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  });
  
  export default router;