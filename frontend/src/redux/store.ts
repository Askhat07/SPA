// store.ts
import { configureStore } from "@reduxjs/toolkit";
import webSocketReducer from "./webSocketSlice"; // Импорт вашего webSocketSlice
import supportReducer from "./supportReducer"; // Редьюсер для службы поддержки

const store = configureStore({
  reducer: {
    websocket: webSocketReducer, // Редьюсер WebSocket
    support: supportReducer, // Редьюсер службы поддержки
    // другие редьюсеры...
  },
});

export default store;

// Типы для использования с TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
