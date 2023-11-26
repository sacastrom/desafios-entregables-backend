import { Router } from "express";
import { getMessages } from "../controller/chat.controller.js";
import { isUser } from "../utils.js";

const router = Router();

router.get('/', isUser,  getMessages);

export default router;