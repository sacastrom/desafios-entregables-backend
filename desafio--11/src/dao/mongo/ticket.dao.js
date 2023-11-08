import ticketsModel from "./models/ticket.model";

export default class Users {
    async getTickets() {
        return await ticketsModel.find({});
      }

    async saveTicket(ticket){
        return await ticketsModel.create(ticket)
    }
 }