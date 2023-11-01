import { ProductsDTO } from "../DTO/products.dto.js";

export class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getProducts(req, res) {
    return await this.dao.getProducts(req, res);
  }

  async getProductById(id) {
    return await this.dao.getProductById(id);
  }

  async saveProduct(data) {
    const productDto = new ProductsDTO(data);
    return await this.dao.saveProduct(productDto);
  }

  async modifyProduct(id, data) {
    const productDto = new ProductsDTO(data);
    productDto._id = !isNaN(id) ? +id : id;
    return await this.dao.update(id, productDto);
  }

  async deleteProduct(id) {
    return await this.dao.deleteProduct(id);
  }
}
