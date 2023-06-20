class ProductManager {
  products;
  static lastId = 0;
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    //Validar que todos los campos sean agregados.
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios");
    }

    //Validar que no se repita CODE.
    let existProduct = this.products.find((product) => product.code === code);
    if (existProduct) {
      throw new Error(
        "Ya existe un producto con ese code, por favor verifique"
      );
    }

    //Validar que los campos stock y price sean números mayores a cero.
    if (isNaN(price) || price <= 0 || isNaN(stock) || stock <= 0) {
      throw new Error("El precio y/o stock debe ser un número mayor a 0");
    }

    //Una vez hechas las validaciones, se crea el producto con su respectivo ID.
    ProductManager.lastId++;
    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.lastId,
    };
    //Se agrega el producto en el array.
    this.products.push(newProduct);
  }
  //Devuelve todos los productos agregados
  getProducts() {
    return this.products;
  }
  //Devuelve el producto que coincida con el ID
  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "Producto no encontrado";
    }
  }
}

const productManager = new ProductManager();
productManager.addProduct("Cafe", "lorem ip", 1, "imagen", 88, 25);
productManager.addProduct("Cafe", "lorem ip", 99, "imagen", 92, 25);

console.log("----- Productos Agregados -----");
console.log(productManager.getProducts());
console.log("----- Producto filtrado por ID -----");
console.log(productManager.getProductById(2));
