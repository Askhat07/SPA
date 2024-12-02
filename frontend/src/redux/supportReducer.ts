// supportReducer.ts
const initialState = {
  message: "",
  status: "idle", // idle, loading, success, error
};

const supportReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_SUPPORT_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_SUPPORT_STATUS":
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

export default supportReducer;
