import passport from "passport";
import local from "passport-local";
import usersModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "user",
      },
      async (req, userName, pass, done) => {
        const { name, last_name, mail, user, password } = req.body;
        try {
          const userAccount = await usersModel.findOne({
            user: userName,
          });
          if (userAccount) {
            return done(null, false, { message: "El usuario ya existe" });
          } else {
            const newUser = {
              name,
              last_name,
              mail,
              user,
              password: createHash(pass),
            };
            console.log(newUser);
            const result = await usersModel.create(newUser);
            return done(null, result);
          }
        } catch (error) {
          return done("Error al obtener el usuario", error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "user",
      },
      async (userName, pass, done) => {
        try {
          const user = await usersModel.findOne({ user: userName });
          console.log(user, "I am here")
          if (!user) {
            return done(null, false, { message: "Tu usuario no existe" });
          } else {
            if (!isValidPassword(user.password, pass)) {
              return done(null, false, { message: "Contraseña incorrecta" });
              
            } else {
                console.log(user, "I am here 2")
              return done(null, user);
              
            }
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
