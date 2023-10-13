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
