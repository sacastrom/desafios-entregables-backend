import express from "express";
import path from "path"
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import realTimeRouter from "./routes/realTimeProducts.router.js";
import chatRouter from "./routes/chat.router.js";
import sessionRouter from "./routes/session.router.js";
//import messagesModel from "./dao/models/message.model.js";
import Messages from "./dao/mongo/messagesDao.js";
import handlebars from "express-handlebars";
import { engine } from "express-handlebars";
import { __filename, isAdmin } from "./utils.js";
import { __dirname } from "./utils.js";
import { authToken } from "./utils.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a la base de datos
let dbConnect = mongoose.connect(MONGO_URI);

dbConnect.then(
  () => {
    console.log("Conexión exitosa a la base de datos");
  },
  (error) => {
    console.log("Error en la conexión a la base de datos", error);
  }
);

//Cookie
app.use(cookieParser("C0D3RS3CR3T"))

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      ttl: 100,
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const messages = new Messages();

const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});



app.engine("handlebars", handlebars.engine());
app.set('views', path.join(__dirname, "./views"));
app.set("view engine", "handlebars");



app.use(express.json());
app.use(express.static("./public"));
// Configurar la carpeta de archivos estáticos
//app.use("/signup", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

/* //Función de autenticación
function auth(req,res,next){
  if(req.session.role){
      return next()
  }else{
      res.send("Error")
  }
} */

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/views", authToken,  viewsRouter)
app.use("/realTime", isAdmin, realTimeRouter);
app.use("/chat", chatRouter);
app.use("/", sessionRouter)

httpServer.on("error", (error) => {
  console.log(`Error: ${error}`);
});

export const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });

  socket.on("mensaje", (data) => {
    console.log(data);
  });

  // Escucha el evento "nuevoProducto"
  socket.on("nuevoProducto", (producto) => {
    // Procesa los datos del producto, guarda en el servidor o base de datos según sea necesario

    // Emitir el evento "nuevoProducto" a todos los clientes conectados, incluyendo al emisor
    socketServer.emit("nuevoProducto", producto);
  });

  socket.on("new-user", (data) => {
    socket.user = data.user;
    socket.id = data.id;
    socketServer.emit("new-user-connected", {
      user: socket.user,
      id: socket.id,
    });
  });

  
  socket.on("message", async (data) => {
    await messages.save(data);
    const updatedMensajes = await messages.getAll();
    socketServer.emit("messageLogs", updatedMensajes);
  });
});
