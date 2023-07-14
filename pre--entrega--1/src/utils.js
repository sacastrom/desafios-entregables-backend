import { fileURLToPath } from "url";
import { dirname } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

console.log("Ruta absoluta del archivo actual:", __filename);
console.log("Directorio del archivo actual:", __dirname);