// userReducer.js
const initialState = {
    email: "",
    password: "",
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_LOGIN_USER":
        return {
          ...state,
          email: action.payload.email,
          password: action.payload.password,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  