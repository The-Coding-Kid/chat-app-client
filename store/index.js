// import { createStore } from "redux";

const reducer = (state = "", action) => {
  switch (action.type) {
    case "LOGIN":
      state = action.payload;
      break;
    case "LOGOUT":
      state = "";
      break;
    default:
      return state;
  }
};

// const store = createStore(reducer);
// export default store;
