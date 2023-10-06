import * as dotenv from "dotenv";

dotenv.config();

export default {
  persistence: process.env.PERSISTENCE,
};