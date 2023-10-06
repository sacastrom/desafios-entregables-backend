import { productsDao } from "../dao/index.js";
import productsModel from "../dao/mongo/models/product.model.js";

async function getProducts(req, res) {
  try {
    const products = await productsDao.getProducts(req, res);
    res.json({ status: "Success", products });
  } catch (error) {
    /* const error = CustomErrors.generateError({
          name: "Products Error",
          message: "Error get products",
          cause: err,
          code: Errors.DATABASE_ERROR
      }) */
    //console.log(error)
    res.json({ status: "error", error });
  }
}

async function getProductByID(req, res) {
  try {
    const id = req.params.pid;
    console.log(id);
    let product = await productsDao.getProductById(id);
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
}

async function createProduct(req, res) {
  try {
    let newProduct = req.body;
    await productsDao.saveProduct(newProduct);
    res.send({ status: "success", message: "Producto agregado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.pid;
    const updatedFields = req.body;
    await productsDao.update(id, updatedFields);
    res.send({ status: "Success", message: "Producto actualizado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.pid;
    await productsDao.deleteProduct(id);
    res.send({ status: "success", message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: "Error", message: error.message });
  }
}

export {
  getProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
};
