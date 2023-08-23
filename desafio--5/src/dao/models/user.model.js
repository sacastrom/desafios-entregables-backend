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
  mail: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;