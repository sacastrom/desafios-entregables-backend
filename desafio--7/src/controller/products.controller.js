import { productsDao } from "../dao/index.js";
import productsModel from "../dao/mongo/models/product.model.js";

async function getProducts(req, res) {
  const { limit = 10, page = 1, sort, query } = req.query;
  const results = await productsModel.paginate(
    query ? { category: query } : {},
    { limit, page, lean: true, sort: sort ? { price: 1 } : { price: -1 } }
  );
  let prevLink = results.hasPrevPage
    ? `http://localhost:8080/productos/?page=${
        +page - 1
      }&limit=${limit}&query=${query}&sort=${sort}`
    : null;
  let nextLink = results.hasNextPage
    ? `http://localhost:8080/productos/?page=${
        +page + 1
      }&limit=${limit}&query=${query}&sort=${sort}`
    : null;
  results.prevLink = prevLink;
  results.nextLink = nextLink;
  res.send(results);
}

async function getProductByID(req, res) {
  try {
    const id = req.params.pid;
    let product = await productsDao.getById(id);
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
        await productsDao.save(newProduct);
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
        await productsDao.delete(id);
        res.send({ status: "success", message: "Producto eliminado" });
      } catch (error) {
        console.error(error);
        res.status(400).send({ status: "Error", message: error.message });
      }
}

export { getProducts, getProductByID, createProduct, updateProduct, deleteProduct };
