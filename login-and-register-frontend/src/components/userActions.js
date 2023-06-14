import axios from "axios";

export const setLoginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:9002/login", { email, password });
      alert(res.data.message);
      dispatch({ type: "SET_LOGIN_USER", payload: res.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};
