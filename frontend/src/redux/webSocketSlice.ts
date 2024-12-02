// webSocketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebSocketState {
  data: any;
  messages: string[];
}

const initialState: WebSocketState = {
  data: null,
  messages: [],
};

const webSocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    addMessage(state, action: PayloadAction<string>) {
      state.messages.push(action.payload);
    },
  },
});

export const { setData, addMessage } = webSocketSlice.actions;
export default webSocketSlice.reducer;
