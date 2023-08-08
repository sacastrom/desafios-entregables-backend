import mongoose from "mongoose";

const cartsCollection = "Carts";

const cartsSchema = new mongoose.Schema({
    products: [{
        id: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }],
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;