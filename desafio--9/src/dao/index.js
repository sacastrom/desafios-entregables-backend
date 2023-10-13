import memoryProducts from './memory/product.dao.js';
import mongoProducts from './mongo/product.dao.js';
import memoryCarts from './memory/cart.dao.js';
import mongoCarts from './mongo/cart.dao.js';
import memoryUsers from './memory/users.dao.js'
import mongoUsers from './mongo/users.dao.js';
import * as dotenv from "dotenv";

dotenv.config()

const PERSISTENCE = process.env.PERSISTENCE
console.log('persistencia', PERSISTENCE)

export const productsDao = PERSISTENCE === "MONGO" ? new mongoProducts() : new memoryProducts();
export const cartsDao = PERSISTENCE === "MONGO" ? new mongoCarts() : new memoryCarts();
export const usersDao = PERSISTENCE === "MONGO" ? new mongoUsers() : new memoryUsers();

