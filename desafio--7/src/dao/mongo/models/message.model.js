import mongoose from "mongoose";

const messagesCollection = "Messages";

const messagesSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String
  }

});

const messagesModel = mongoose.model(messagesCollection, messagesSchema);

export default messagesModel;
