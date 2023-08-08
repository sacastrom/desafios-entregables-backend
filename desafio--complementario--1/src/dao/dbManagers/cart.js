import cartsModel from "../models/cart.model.js";

export default class Carts {
  getAll = async () => {
    return await cartsModel.find({}).lean();
  };

  getById = async (id) => {
    return await cartsModel.find({ _id: id });
  };

  save = async (data) => {
    const respuesta = cartsModel.create(data);
    return respuesta;
  };

  saveProductToCart = async (cartId, productId) => {
    const cart = await cartsModel.findById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    } else {
      let productToAdd = cart.products.find((prod) => prod.id === productId);
      if (productToAdd) {
        productToAdd.quantity++;
      } else {
        productToAdd = {
          id: productId,
          quantity: 1,
        };
        cart.products.push(productToAdd);
      }
    }

    const updatedCart = await cartsModel.create(cart);
    return updatedCart;
  };

  delete = async (id) => {
    const respuesta = cartsModel.findByIdAndDelete(id);
    return respuesta;
  };
}
