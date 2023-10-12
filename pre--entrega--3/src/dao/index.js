import memoryProducts from './memory/product.dao.js';
import mongoProducts from './mongo/product.dao.js';
import memoryCarts from './memory/cart.dao.js';
import mongoCarts from './mongo/cart.dao.js';
import { persistence } from '../config/config.js'

export const productsDao = persistence === MONGO ? new mongoProducts() : new memoryProducts();
export const cartsDao = persistence === MONGO ? new mongoCarts() : new memoryCarts();

