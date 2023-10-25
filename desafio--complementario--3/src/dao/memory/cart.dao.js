import { productsDao } from "../index.js";

export default class CarritoMemoryDao {
  constructor() {
    this.carritos = [];
  }

  async getCarts() {
    return this.carritos;
  }

  async getCartById(cid) {
    const cart = this.carritos.find(c => c.id === +cid);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
  
    const productPromises = cart.products
      ? cart.products.map(async (p) => {
          const product = await productsDao.getProductById(p.product);
          return { product: product };
        })
      : [];
  
    const products = await Promise.all(productPromises);
  
    return { id: cart.id, products };
  }

  async save(cart) {
    const newCart = { id: this.carritos.length + 1, ...cart };
    this.carritos.push(newCart);
    return newCart;
  }

  async saveProductToCart(cid, pid) {
    if (!this.carritos) {
      this.carritos = []; // Inicializar carritos como un arreglo vacío si es null o undefined
    }
  
    const cart = this.carritos.find((c) => c.id === +cid);
    const product = await productsDao.getProductById(pid);
    console.log('Carrito', cart);
    console.log('Producto', product);
  
    if (cart) {
      if (!cart.products) {
        cart.products = []; // Inicializar cart.products como un arreglo vacío si es undefined
      }
  
      const existingProduct = cart.products.find((p) => p.product === product._id);
  
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }
  
      return cart;
    } else {
      throw new Error("Cart not found");
    }
  }

  async deleteProductCart(cid, pid) {
    const carrito = this.carritos.find((c) => c.id === +cid);
    if (carrito) {
      const indexProduct = carrito.products.findIndex(
        (p) => p.product === +pid
      );
      if (indexProduct === -1) return "Product not found";
      carrito.products.splice(indexProduct, 1);
      return carrito;
    } else {
      return "Cart not found";
    }
  }

  async updateCart(cid, data) {
    const carrito = this.carritos.find((c) => c.id === +cid);
    if (carrito) {
      carrito.products = data;
      return carrito;
    } else {
      return "Cart not found";
    }
  }

  async updateQuantityProductsCart(cid, pid, quantity) {
    const carrito = this.carritos.find((c) => c.id === +cid);
    if (carrito) {
      const productoEnCarrito = carrito.products.findIndex(
        (p) => p.product === +pid
      );
      if (productoEnCarrito !== -1) {
        const product = carrito.products[productoEnCarrito];
        product.quantity = quantity;
        return carrito;
      } else {
        return "Product not found";
      }
    } else {
      return "Cart not found";
    }
  }

  async deleteProductsCart(cid) {
    const carrito = this.carritos.find((c) => c.id === +cid);
    if (carrito) {
      carrito.products = [];
      return carrito;
    } else {
      return "Cart not found";
    }
  }
}
