import { Router } from "express";
//import messagesModel from "../dao/models/message.model.js";

const router = Router();

router.get('/', (req, res) => {
    res.render("chat", {script: 'chat.js'});
});

export default router;