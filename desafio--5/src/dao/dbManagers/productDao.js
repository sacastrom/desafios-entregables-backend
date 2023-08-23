import productsModel from "../models/product.model.js";

export default class Products {
  getAll = async () => {
    return await productsModel.find({}).lean();
  };

  getById = async (id) => {
    return await productsModel.find({_id:id});
  };

  save = async (data) => {
    const respuesta = productsModel.create(data);
    return respuesta;
  };

  update = async (id, data) => {
    const respuesta = productsModel.findByIdAndUpdate(id, data);
    return respuesta;
  };

  delete = async (id) => {
    const respuesta = productsModel.findByIdAndDelete(id);
    return respuesta;
  };
}
