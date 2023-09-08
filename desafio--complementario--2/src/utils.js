import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (savedPassword, password) => {
    console.log("Saved password: " + savedPassword, "Password: " + password )
    return bcrypt.compareSync(password, savedPassword);
}
  

/* console.log("Ruta absoluta del archivo actual:", __filename);
console.log("Directorio del archivo actual:", __dirname); */
