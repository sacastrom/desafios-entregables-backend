import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { socketServer } from "../app.js";

const router = Router();

const productManager = new ProductManager("productos.json");
let products = await productManager.getProducts();

router.get("/", (req, res) => {
    try {
      res.render("realTimeProducts", { products, style: "realtime.css" });
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
      const newProduct = await productManager.addProduct(formData);
  
      // Cargar los productos nuevamente después de agregar un nuevo producto
      const products = await productManager.getProducts();
  
      // Emitir el evento "nuevoProducto" con los datos del nuevo producto
      socketServer.emit("nuevoProducto", newProduct);
  
      res.json({ status: "success", message: "Datos guardados correctamente", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  });

  router.delete("/", async (req, res) => {
    try {
      const productId = req.body.id; // ID del producto a eliminar enviado en el cuerpo de la solicitud
      
      await productManager.deleteProductById(productId);
  
      // Cargar los productos nuevamente después de eliminar el producto
      const products = await productManager.getProducts();
    

      // Emitir el evento "productoEliminado" con el ID del producto eliminado
      socketServer.emit("productoEliminado", productId);
  
      
  
      res.json({ status: "success", message: "Producto eliminado correctamente", products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    }
  });
  
  export default router;