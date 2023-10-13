import { productsDao } from "../dao/index.js";
import { cartsDao } from "../dao/index.js";
import productsModel from "../dao/mongo/models/product.model.js";
import cartsModel from "../dao/mongo/models/cart.model.js";

async function showProducts(req, res) {
  const { limit = 10, page = 1, sort, query } = req.query;
  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
    await productsModel.paginate(query ? { category: query } : {}, {
      limit,
      page,
      lean: true,
      sort: sort ? { price: 1 } : { price: -1 },
    });
  res.render("index", {
    title: "Productos",
    productos: docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    limit,
    sort,
    query,
    style: "style.css",
    script: "agregarProducto.js",
    nombre: req.user.user.name,
    apellido: req.user.user.last_name,
    user: req.user.user.user,
    mail: req.user.user.mail,
    rol: req.user.user.role,
  });
}

async function showCart(req, res) {
  try {
    const id = req.params.cid;
    let cart = await cartsModel.findOne({ _id: id }).lean();
    let productos = cart.products;
    res.render("cart", { productos, style: "cart.css", script: "index.js" });
  } catch (error) {
    res
      .status(500)
      .send({ status: "Error", message: "Error interno del servidor" });
  }
}

export { showProducts, showCart };
