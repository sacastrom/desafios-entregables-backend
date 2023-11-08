import mongoose from "mongoose";

const usersCollection = "Users";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    //required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    default: "user",
  },
});

usersSchema.pre("findById", function () {
  this.populate("cart.product");
});
usersSchema.pre("findOne", function () {
  this.populate("cart.product");
});

usersSchema.pre("find", function () {
  this.populate("cart.product");
});

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;
