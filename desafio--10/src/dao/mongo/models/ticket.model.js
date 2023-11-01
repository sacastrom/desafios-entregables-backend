import mongoose from "mongoose";

const ticketsCollection = "Tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number },
  purchaser: { type: String },
});

const ticketsModel = mongoose.model(ticketsCollection, ticketSchema);

export default ticketsModel;