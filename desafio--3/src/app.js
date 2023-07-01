import express from "express";
import ProductManager from "./index.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
const productManager = new ProductManager("productos.json");

app.get("/", (req, res) => {
  res.send("hola mundo")
});

app.get("/productos", async (req, res) => {
  try {
    let response = await productManager.getProducts();
    const limit = req.query.limit || response.length;
    const productsLimit = response.slice(0, limit);
    res.json(productsLimit);
  } catch (err) {
    console.log(err);
  }
});

app.get("/productos/:productId", async (req, res) => {
  const id = parseInt(req.params.productId);
  let product = await productManager.getProductById(id);
  console.log(product);

  if (product) {
    res.json(product);
  } else {
    res.json({
      message: "el producto solicitado no existe",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
