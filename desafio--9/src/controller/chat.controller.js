async function getMessages(req, res){
    res.render("chat", {script: 'chat.js'});
}

export {getMessages};