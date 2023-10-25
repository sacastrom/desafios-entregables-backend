import passport from "passport";
import local from "passport-local";
//import usersModel from "../dao/mongo/models/user.model.js";
import { cartsDao, usersDao } from "../dao/index.js";
import { UsersRepository } from "../dao/repository/users.repository.js";
import { createHash, isValidPassword } from "../utils.js";
import GitHubStrategy from "passport-github2";
import * as dotenv from "dotenv";
import jwt, { ExtractJwt } from "passport-jwt";

dotenv.config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;
const JwtStrategy = jwt.Strategy;
const LocalStrategy = local.Strategy;

const userService = new UsersRepository(usersDao);

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "user",
      },
      async (req, userName, pass, done) => {
        const { name, last_name, email, user, password } = req.body;
        console.log(userName);
        try {
          const userAccount = await userService.getUserByUser(userName);
          if (userAccount) {
            return done(null, false, { message: "El usuario ya existe" });
          } else {
            const CART = {
              products: [],
            };
            let cart = await cartsDao.save(CART);
            const newUser = {
              name,
              last_name,
              email,
              user,
              cart: cart._id,
              role: "user",
              password: createHash(pass),
            };
            console.log("Nuevo usuario", newUser);
            const result = await userService.createUser(newUser);
            return done(null, result);
          }
        } catch (error) {
          return done("Error al obtener el usuario", error);
        }
      }
    )
  );

  /* passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "user",
      },
      async (userName, pass, done) => {
        try {
          const user = await usersModel.findOne({ user: userName });
          console.log(user, "I am here");
          if (!user) {
            return done(null, false, { message: "Tu usuario no existe" });
          } else {
            if (!isValidPassword(user.password, pass)) {
              return done(null, false, { message: "Contraseña incorrecta" });
            } else {
              console.log(user, "I am here 2");
              return done(null, user);
            }
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  ); */

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "CoderKeySecreta",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          let emailUser = profile?.emails[0]?.value;
          let user = await userService.getUserByEmail(emailUser);
          if (!user) {
            const newUser = {
              name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              user: profile.username,
              password: "1234",
              role: "admin",
            };
            const result = await userService.createUser(newUser);

            done(null, result);
          } else {
            done(null, user);
          }
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.getUserById(id);
    done(null, user);
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }
  return token;
};

export default initializePassport;
