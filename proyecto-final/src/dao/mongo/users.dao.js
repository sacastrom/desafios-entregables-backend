import usersModel from "./models/user.model.js";

export default class Users {
  async getUsers() {
    return await usersModel.find({});
  }

  async getUserByUser(user) {
    return await usersModel.findOne({ user: user });
  }

  async getUserByEmail(email) {
    return await usersModel.findOne({ email: email });
  }

  async getUserByCart(cartId) {
    try {
      const user = await usersModel.findOne({ cart: cartId }).populate('cart').populate('cart.product');
      return user;
    } catch (error) {
      throw new Error('Error al obtener el usuario asociado al carrito');
    }
  }

  async createUser(user) {
    return await usersModel.create(user);
  }

  async deleteUser(id) {
    return await usersModel.findByIdAndDelete(id);
  }

  async getUserById(id) {
    return await usersModel.findById(id);
  }
}
