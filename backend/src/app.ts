// import express from "express";
// import { config } from "dotenv";
// import morgan from "morgan";
// import appRouter from "./routes/index.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// config();

// const app = express();

// // промежуточные программное обеспечение
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser(process.env.COOKIE_SECRET));

// // remove it in production
// app.use(morgan("dev"));

// app.use("/api/v1", appRouter);

// export default app;

// import express from "express";
// import { config } from "dotenv";
// import morgan from "morgan";
// import appRouter from "./routes/index.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import http from "http";
// import * as socketIo from "socket.io"; // Correct import

// config();

// const app = express();

// // промежуточные программное обеспечение
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser(process.env.COOKIE_SECRET));

// // remove it in production
// app.use(morgan("dev"));

// app.use("/api/v1", appRouter);

// const server = http.createServer(app);

// const io = new socketIo.Server(server);

// let data = {};
// setInterval(() => {
//   data = {
//     ...data,
//     newValue: Math.random(),
//   };
//   io.emit("data-update", data);
// }, 5000);

// export { server, io };

// app.ts
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import * as socketIo from "socket.io";

config();

const app = express();

// Промежуточные программное обеспечение
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev")); // Убирайте это в продакшн

// Подключение маршрутов
app.use("/api/v1", appRouter);

// Создаем HTTP-сервер
const server = http.createServer(app);

// Настройка WebSocket
const io = new socketIo.Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let data = {};
setInterval(() => {
  data = {
    ...data,
    newValue: Math.random(),
  };
  io.emit("data-update", data);
}, 5000);

export { server, io };
