import { Router } from "express";
import usersModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";
import local from "passport-local"

const router = Router();

router.get("/session/signup", (req, res) => {
  res.render("signup", {
    title: "Registrarse",
    style: "signup.css",
    script: "signup.js",
  });
});

router.get("/", (req, res) => {
  res.render("login", {
    title: "Login",
    style: "login.css",
    script: "login.js",
  });
});

 router.post("/login",passport.authenticate("login",{
    failureRedirect: "/failLogin"}),async(req,res)=>{
        console.log(req.user, "existe")
        if(!req.user){
            return res.status(401).json({status: "Error", message: "Error de autenticación"})
        }else{
            req.session.name = req.user.name
            req.session.last_name = req.user.last_name
            req.session.user = req.user.user
            req.session.email = req.user.email
            req.session.password = req.user.password
            req.session.rol = "user"
            return res.json({
                status: "OK",
                message: "Logueado con exito"
            })
        }
    })

router.get("/failLogin", async (req, res) => {
    console.log("failed strategy");
    res.send({ error: "failed" });
  }); 

/*  router.post("/login", async (req, res) => {
  const { user, password } = req.body;
  console.log(user,password)
  const userLogin = await usersModel.findOne({
    user: user,
  });

  console.log(userLogin);
  console.log(isValidPassword(userLogin.password, password));

  if (userLogin.length === 0) {
    return res.status(401).json({
      respuesta: "el usuario no existe",
    });
  } else if (!isValidPassword(userLogin.password, password)) {
    return res.status(403).json({
      respuesta: "la contraseña es incorrecta",
    });
  } else {
    if (user === "AdminCoder" && password === "adminCod3r123") {
      req.session.name = "Admin";
      req.session.last_name = "Coder";
      req.session.user = "AdminCoder";
      req.session.mail = "adminCoder@coder.com";
      req.session.password = "adminCod3r123";
      req.session.rol = "admin";
      return res.json({
        status: "OK",
        message: "Es Admin",
      });
    } else {
      if (userLogin) {
        req.session.name = userLogin.name;
        req.session.last_name = userLogin.last_name;
        req.session.user = userLogin.user;
        req.session.mail = userLogin.mail;
        req.session.password = userLogin.password;
        req.session.rol = "user";
        return res.json({
          status: "OK",
          message: "Inicio exitoso",
        });
      } else {
        req.session.rol = false;
        return res.json({
          status: "Error",
          message: "Error de inicio de sesión",
        });
      }
    }
  }
});  */

/* router.post("/signup", async (req, res) => {
  const { name, last_name, mail, user, password } = req.body;
  const result = await usersModel.create({
    name,
    last_name,
    mail,
    user,
    password: createHash(password),
  });
  if (result) {
    return res.json({
      status: "Ok",
      message: "Registrado con exito",
    });
  } else {
    return res.json({
      status: "Error",
      message: "Error al registrar el usuario",
    });
  }
}); */

router.post(
  "/signup",
  passport.authenticate("register", {
    failureRedirect: "/failRegister",
  }),
  async (req, res) => {
    res.send({ status: "success", message: "user registered" });
  }
);

router.get("/failRegister", async (req, res) => {
  console.log("failed strategy");
  res.send({ error: "failed" });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      return res.json({
        message: "Sesión cerrada",
      });
    } else {
      return res.json({
        message: "Error al cerrar sesión",
      });
    }
  });
});

export default router;
