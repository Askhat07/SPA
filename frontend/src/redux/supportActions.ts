// supportActions.ts
export const setSupportMessage = (message: string) => ({
  type: "SET_SUPPORT_MESSAGE",
  payload: message,
});

export const setSupportStatus = (status: string) => ({
  type: "SET_SUPPORT_STATUS",
  payload: status,
});
