// import app from "./app.js";
// import { connectToDatabase } from "./db/connection.js";

// // // connection and listen
// const PORT = process.env.PORT || 5000;

// connectToDatabase()
//   .then(() => {
//     app.listen(PORT, () => console.log("Server Open & Connected To Database"));
//   })
//   .catch((err) => console.log(err));

// // index.ts
// import { server } from "./app.js";
// import { connectToDatabase } from "./db/connection.js";

// // connection and listen
// const PORT = process.env.PORT || 5000;

// connectToDatabase()
//   .then(() => {
//     server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.log(err));

// index.ts
import { server } from "./app.js";
import { connectToDatabase } from "./db/connection.js";

// Подключение к базе данных и запуск сервера
const PORT = parseInt(process.env.PORT || "5000", 10);

connectToDatabase()
  .then(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection failed:", err));
