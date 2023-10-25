async function getMessages(req, res){
    res.render("chat", {script: 'chat.js', style: "chat.css",});
}

export {getMessages};