import { Router } from "express";
//import usersModel from "../dao/mongo/models/user.model.js";
import { usersDao } from "../dao/index.js";
import { UsersRepository } from "../dao/repository/users.repository.js";
import {
  createHash,
  generateToken,
  authToken,
  isValidPassword,
  passportCall,
  authorization,
} from "../utils.js";
import passport from "passport";
import local from "passport-local";

const router = Router();

const userService = new UsersRepository(usersDao)

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



router.get("/failLogin", async (req, res) => {
  console.log("failed strategy");
  res.send({ error: "failed" });
});

router.post("/login", async (req, res) => {
  const { user, password } = req.body;
  const userLogin = await userService.getUserByUser(user)

  if (!userLogin) {
    return res.json({ status: "error", message: "User not found" });
  } else {
    if (!isValidPassword(userLogin.password, password)) {
      return res.json({ status: "error", message: "Invalid password" });
    } else {
      const myToken = generateToken(userLogin);
      res.cookie("coderCookieToken", myToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      //req.session.rol = true;
      return res.json({ status: "success" });
    }
  }
});

router.get(
  "/current",
  authToken, // Asegúrate de que este middleware se ejecute antes de la ruta /current
  authorization("user"),
  (req, res) => {
    console.log("calling current");
    console.log(req.user);
    res.send(req.user);
  }
);


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

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/" }),
  async (req, res) => {
    
    req.session.user = req.user;
    //console.log(req.user);
    const myToken = generateToken(req.user);
      res.cookie("coderCookieToken", myToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
    res.redirect("/views");
  }
);

export default router;
