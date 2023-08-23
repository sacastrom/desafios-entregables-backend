import { Router } from "express";
import usersModel from "../dao/models/user.model.js";

const router = Router();

router.get("/session/signup",(req,res)=>{
    res.render("signup",{title: "Registrarse", style: "signup.css", script: "signup.js"})
})

router.get("/",(req,res)=>{
    res.render("login",{title: "Login", style: "login.css", script: "login.js"})
})

router.post("/login", async (req,res) => {
    const {user,password} = req.body
    const userLogin = await usersModel.findOne({user: user, password: password})
    console.log(userLogin)
    if(user === "adminCoder@coder.com" && password === "adminCod3r123"){
        req.session.name = "Admin"
        req.session.last_name = "Coder"
        req.session.user = "AdminCoder"
        req.session.mail = "adminCoder@coder.com"
        req.session.password = "adminCod3r123"
        req.session.rol = "admin"
        return res.json({
            status: "Ok",
            message: "Es Admin"
        })
    }else{
        if(userLogin){
        req.session.name = user.name
        req.session.last_name = user.last_name
        req.session.user = user.user
        req.session.mail = user.mail
        req.session.password = user.password
        req.session.rol = "user"
            return res.json({
                status: "OK",
                message: "Inicio exitoso"
            })
        }else{
            req.session.rol = false
            return res.json({
                status: "Error", 
                message: "Error de inicio de sesión"
            })
        }
    }
});

router.post("/signup", async(req,res)=>{
    const {name,last_name,mail,user,password} = req.body
    const result = await usersModel.create({
        name,
        last_name,
        mail,
        user,
        password
    })
    if(result){
        return res.json({
            status: "Ok",
            message: "Registrado con exito"
        })
    }else{
        return res.json({
            status: "Error",
            message: "Error al registrar el usuario"
        })
    }
})

export default router;