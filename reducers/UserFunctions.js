const logInUser = (id) => {
  return {
    type: "LOG_IN_USER",
    payload: {
      user_id: id,
    },
  };
};

const logOutUser = () => {
  return {
    type: "LOG_OUT_USER",
  };
};

// REDUCER
const UserReducer = (state = "", action) => {
  switch (action.type) {
    case "LOG_IN_USER":
      state = action.payload;
      return state;
    case "LOG_OUT_USER":
      state = "";
      return state;
    default:
      return state;
  }
};

export default UserReducer;
