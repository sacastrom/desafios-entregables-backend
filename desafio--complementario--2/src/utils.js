import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
    console.log("Saved password: " + savedPassword, "Password: " + password )
    return bcrypt.compareSync(password, savedPassword);
}

let privateKey = "CoderKeySecreta"

export const generateToken = (user)=>{
    const token = jwt.sign({user},privateKey,{expiresIn: "1h"})
    return token
}

export const authToken = (req,res,next)=>{
  let auth = req.cookies.coderCookieToken
  if(!auth) return res.json({status: "error", message: "Invalid auth"})

  const token = auth

  jwt.verify(token,privateKey,(err,user)=>{
      if(err) res.json({status: "error", message: "Invalid Token"})
      req.user = user
      next()
  })
}

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user)
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      user.role = "admin";
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (req.user.role != role)
      return res.status(403).send({ error: "No permissions" });
    next();
  };
};
  

/* console.log("Ruta absoluta del archivo actual:", __filename);
console.log("Directorio del archivo actual:", __dirname); */
