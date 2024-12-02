// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import { createTheme, ThemeProvider } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./context/AuthContext.tsx";
// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:5000/api/v1";
// axios.defaults.withCredentials = true;

// const theme = createTheme({
//   typography: {
//     fontFamily: "Roboto Slab, serif",
//     allVariants: { color: "white" },
//   },
// });

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <BrowserRouter>
//         <ThemeProvider theme={theme}>
//           <Toaster position="top-right" />
//           <App />
//         </ThemeProvider>
//       </BrowserRouter>
//     </AuthProvider>
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";
// import { createTheme, ThemeProvider } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./context/AuthContext.tsx";
// import axios from "axios";
// import { Provider } from "react-redux"; // Импортируем Provider из react-redux
// import store from "./redux/store.ts"; // Импортируем созданный store для Redux

// // Настройка базового URL для axios
// axios.defaults.baseURL = "http://localhost:5000/api/v1";
// axios.defaults.withCredentials = true;

// // Настройка темы Material UI
// const theme = createTheme({
//   typography: {
//     fontFamily: "Roboto Slab, serif",
//     allVariants: { color: "white" },
//   },
// });

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     {/* Оборачиваем приложение в Provider с Redux store */}
//     <Provider store={store}>
//       <AuthProvider>
//         <BrowserRouter>
//           <ThemeProvider theme={theme}>
//             <Toaster position="top-right" />
//             <App />
//           </ThemeProvider>
//         </BrowserRouter>
//       </AuthProvider>
//     </Provider>
//   </React.StrictMode>
// );

// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

// Настройка базового URL для axios
axios.defaults.baseURL = "http://localhost:5000/api/v1";
axios.defaults.withCredentials = true;

// Настройка темы Material UI
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: { color: "white" },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Toaster position="top-right" />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// Регистрация service worker (добавить этот код в самый конец)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").then(
      (registration) => {
        console.log(
          "Service Worker зарегистрирован с областью:",
          registration.scope
        );
      },
      (error) => {
        console.error("Ошибка регистрации Service Worker:", error);
      }
    );
  });
}
