import cartsModel from "./models/cart.model.js";
import productsModel from "./models/product.model.js";

export default class Carts {
  getCarts = async () => {
    return await cartsModel.find({}).lean();
  };

  getCartById = async (id) => {
    return await cartsModel.findOne({ _id: id });
  };

  save = async (data) => {
    const respuesta = cartsModel.create(data);
    return respuesta;
  };

  saveProductToCart = async (cartId, productId) => {
    try {
      const cart = await cartsModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
      console.log(cart);
      console.log(productId);
      const productToAdd = cart.products.find(
        (prod) => prod.product._id.toString() === productId
      );
      console.log(productToAdd);

      if (productToAdd) {
        productToAdd.quantity++;
      } else {
        const product = await productsModel.findById(productId);

        if (!product) {
          throw new Error("Producto no encontrado");
        }

        cart.products.push({
          product: product._id,
          quantity: 1,
        });
      }

      const updatedCart = await cart.save();
      return updatedCart;
    } catch (error) {
      throw new Error(
        "Error al guardar el producto en el carrito: " + error.message
      );
    }
  };

  deleteProductFromCart = async (cartId, productId) => {
    const cart = await cartsModel.findById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    } else {
      let productToDelete = cart.products.findIndex(
        (prod) => prod.product.id === productId
      );

      if (productToDelete !== -1) {
        cart.products.splice(productToDelete, 1);
        const respuesta = cartsModel.findByIdAndUpdate(cartId, cart);
        return respuesta;
      } else {
        throw new Error("Producto no encontrado");
      }
    }
  };

  updateProductsFromCart = async (cartId, data) => {
    try {
      // Busca el carrito por su ID
      const cart = await cartsModel.findById(cartId);

      if (!cart) {
        throw new Error("No se encontró el carrito");
      }
      console.log(data);
      // Actualiza los productos del carrito con los datos proporcionados
      cart.products = data;

      // Guarda los cambios en el carrito
      const respuesta = await cart.save();
      return respuesta;
    } catch (error) {
      throw new Error(
        "Error al actualizar los productos del carrito: " + error.message
      );
    }
  };

  updateProductQuantity = async (cartId, productId, newQuantity) => {
    // Buscar el carrito por su ID
    const cart = await cartsModel.findById(cartId);

    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    // Buscar el producto en el carrito por su ID
    const productIndex = cart.products.findIndex(
      (product) => product.product._id.toString() === productId
    );

    if (productIndex === -1) {
      throw new Error("Producto no encontrado en el carrito");
    }

    // Actualizar la cantidad de ejemplares del producto
    cart.products[productIndex].quantity = newQuantity;

    // Guardar los cambios en la base de datos
    await cart.save();

    return cart;
  };

  delete = async (id) => {
    const respuesta = cartsModel.findByIdAndDelete(id);
    return respuesta;
  };
}
