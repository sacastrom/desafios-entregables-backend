import fs from "fs";
import { __filename } from "../utils.js";
import { __dirname } from "../utils.js";

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async getCarts() {
    try {
      const data = await fs.promises.readFile(__dirname + "/" + path, "utf-8");

      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error al leer el archivo de productos");
    }
  }

  async addCart() {
    try {
      const carts = await this.getCarts();
      const newCart = {
        id: carts.length + 1,
        products: [],
      };
      carts.push(newCart);
      await fs.promises.writeFile(
        __dirname + "/" + path,
        JSON.stringify(carts, null, 2)
      );
      return newCart;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear un nuevo carrito");
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const carts = await this.getCarts();
      const cartToAdd = carts.find((cart) => cart.id === cartId);
      if (cartToAdd) {
        let productToAdd = cartToAdd.products.find(
          (prod) => prod.id === productId
        );
        if (productToAdd) {
          productToAdd.quantity++;
        } else {
          productToAdd = {
            id: productId,
            quantity: 1,
          };
          cartToAdd.products.push(productToAdd);
        }

        await fs.promises.writeFile(
          __dirname + "/" + path,
          JSON.stringify(carts, null, 2)
        );
        return cartToAdd;
      } else {
        throw new Error("Carrito no encontrado");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar un producto al carrito");
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCarts();
      const cartFound = carts.find((cart) => cart.id === cartId);
      if (cartFound) {
        return cartFound;
      } else {
        throw new Error("Carrito no encontrado");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error al buscar el carrito por ID");
    }
  }
}

export default CartManager;

//Probando el código
const path = "carritos.json";
const cartManager = new CartManager(path);

/* let newCart = {
    products:[]
}

await cartManager.addCart(newCart); */

/* let allCarts = await cartManager.getCarts();
console.log(allCarts) */

/* await cartManager.addProductToCart(2, 2); */
/* 
let cartById = await cartManager.getCartById(2);
console.log(cartById); */
