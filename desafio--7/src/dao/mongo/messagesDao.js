import messagesModel from "./models/message.model.js";

export default class Messages {
  getAll = async () => {
    return await messagesModel.find({}).lean();
  };

  save = async (data) => {
    const respuesta = messagesModel.create(data);
    return respuesta;
  };
}
