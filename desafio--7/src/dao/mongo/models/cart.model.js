import mongoose from "mongoose";

const cartsCollection = "Carts";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

cartsSchema.pre("find", function (next) {
  this.populate("products.product");
  next();
}); 

cartsSchema.pre("findOne", function (next) {
  this.populate("products.product");
  next();
}); 

cartsSchema.pre("save", function (next) {
  this.populate("products.product");
  next();
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
