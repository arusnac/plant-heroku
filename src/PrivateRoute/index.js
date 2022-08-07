import { Navigate } from "react-router-dom";
import { AccountContext } from "../components/Account";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formControlClasses } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(
    useSelector((state) => state.user.value.user[0].isLoggedIn)
  );

  const { getSession, logout, getUser, ChangePassword } =
    useContext(AccountContext);
  const user = getUser();

  return user ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
