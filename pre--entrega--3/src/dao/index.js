import memoryProducts from './memory/product.dao.js';
import mongoProducts from './mongo/product.dao.js';
import memoryCarts from './memory/cart.dao.js';
import mongoCarts from './mongo/cart.dao.js';

const persistence = process.env.PERSISTENCE

export const productsDao = persistence === "MONGO" ? new mongoProducts() : new memoryProducts();
export const cartsDao = persistence === "MONGO" ? new mongoCarts() : new memoryCarts();

