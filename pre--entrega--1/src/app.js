import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
