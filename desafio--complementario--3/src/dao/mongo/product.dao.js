import productsModel from "./models/product.model.js";

export default class Products {
  getProducts = async () => {
    return await productsModel.find({}).lean();
  };

  getProductById = async (id) => {
    return await productsModel.find({_id:id});
  };

  saveProduct = async (data) => {
    const respuesta = productsModel.create(data);
    return respuesta;
  };

  update = async (id, data) => {
    const respuesta = productsModel.findByIdAndUpdate(id, data);
    return respuesta;
  };

  deleteProduct = async (id) => {
    const respuesta = productsModel.findByIdAndDelete(id);
    return respuesta;
  };
}
