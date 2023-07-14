import fs from "fs";
import { error } from "console";
import { __filename } from "../utils.js";
import { __dirname } from "../utils.js";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  //Devuelve todos los productos agregados
  async getProducts() {
    try {
      const data = await fs.promises.readFile(__dirname + "/" + path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error("Error al leer el archivo de productos");
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      //Validar que todos los campos sean agregados.
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.category ||
        !product.stock
      ) {
        throw new Error("Todos los campos son obligatorios");
      }

      //Validar que no se repita CODE.
      let existProduct = products.find((prod) => prod.code === product.code);
      if (existProduct) {
        throw new Error(
          "Ya existe un producto con ese code, por favor verifique"
        );
      }

      //Validar que los campos stock y price sean números mayores a cero.
      if (
        isNaN(product.price) ||
        product.price <= 0 ||
        isNaN(product.stock) ||
        product.stock <= 0
      ) {
        throw new Error("El precio y/o stock debe ser un número mayor a 0");
      }

      //Asignar un nuevo ID que no se repita.
      let newId = 1;
      while (products.some((prod) => prod.id === newId)) {
        newId++;
      }

      //Una vez hechas las validaciones, se crea el producto con su respectivo ID.

      const newProduct = {
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        category: product.category,
        id: newId,
        status: true,
      };
      //Se agrega el producto en el array.
      products.push(newProduct);
      await fs.promises.writeFile(
        __dirname + "/" + path,
        JSON.stringify(products, null, 2)
      );
      return newProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Error al agregar un nuevo producto");
    }
  }

  //Devuelve el producto que coincida con el ID
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((prod) => prod.id === id);
      if (product) {
        return product;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al buscar producto por ID");
    }
  }

  //Modificación de un producto el cual recibe como parámetros ID y los campos a actualizar
  async updateProduct(id, updatedFields) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((prod) => prod.id === id);
      //Verifica que en los campos a modificar no esté ID, ya que no se puede modificar
      if (Object.keys(updatedFields).includes("id")) {
        throw new Error("No se puede modificar el ID de un producto");
      }
      //Verifica que el nuevo CODE no exista
      if (Object.keys(updatedFields).includes("code")) {
        let codeExist = products.some(
          (prod) => prod.code === updatedFields.code
        );
        if (codeExist) {
          throw new Error(
            "El código que intentas modificar ya existe, por favor verifique"
          );
        }
      }
      if (index !== -1) {
        const updatedProduct = { ...products[index], ...updatedFields, id };
        products[index] = updatedProduct;
        await fs.promises.writeFile(
          __dirname + "/" + path,
          JSON.stringify(products, null, 2)
        );
        return updatedProduct;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al actualizar producto");
    }
  }

  //Elimina un producto recibiendo como parámetro el ID
  async deleteProductById(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((prod) => prod.id === id);
      if (index !== -1) {
        let deletedProduct = products[index];
        products.splice(index, 1);
        await fs.promises.writeFile(
          __dirname + "/" + path,
          JSON.stringify(products, null, 2)
        );
        return deletedProduct;
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar producto");
    }
  }
}

export default ProductManager;

//Probando el código
 const path = "productos.json";
const productManager = new ProductManager(path); 

/*  console.log("----- Nuevo Producto Agregado -----");
const newProduct1 = {
  title: "cafe",
  description: "lorem ip",
  price: 25,
  thumbnail: "imagen",
  code: 99988889,
  stock: 32,
};

let productoAgregado = await productManager.addProduct(newProduct1);
console.log("Producto agregado", productoAgregado);  */

/* console.log("----- Productos Agregados -----");
let allProducts = await productManager.getProducts();
console.log("Todos los productos", allProducts); */

/* console.log("----- Producto filtrado por ID -----");
let productByID = await productManager.getProductById(1);
console.log("Producto filtrado por ID:", productByID);  */

/* console.log("----- Actualizar campos de un producto filtrado por ID -----");
const idToUpdate = 3;
const updateFields = {
  title: "nintendo",
  description: "mendoza",
  price: 123,
  thumbnail: "imagen22",
  code: 2222,
  stock: 123,
};
const updatedProduct = await productManager.updateProduct(
  idToUpdate,
  updateFields
);
console.log("Producto actualizado:", updatedProduct); */

/* console.log("----- Eliminar un producto filtrado por ID -----");
const idToDelete = 2;
const deletedProduct = await productManager.deleteProductById(idToDelete);
console.log("Producto eliminado:", deletedProduct); */
