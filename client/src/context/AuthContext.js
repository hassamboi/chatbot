import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, token: localStorage.getItem('token'), isAuthenticated: true, user: action.payload.user };
    case "LOGOUT_USER":
      return { ...state, token: null, isAuthenticated: false, user: null}
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { token:localStorage.getItem('token'), isAuthenticated: false, user: null }); //initial state


  //authenticate user
  const loginUser = userData => {
    console.log("AUTH DATA" , userData);
    localStorage.setItem('token', userData.token);
    
    dispatch({
      type: "LOGIN_USER",
      payload: userData,
    });}
    
      //logout user
    const logoutUser = () => {
      localStorage.removeItem('token');
    dispatch({
      type: "LOGOUT_USER"
    });
  }
 

  return <AuthContext.Provider value={{ ...state, loginUser, logoutUser}}>{children}</AuthContext.Provider>;
};
