import SignUp from "./SignUp";
import Login from "./Login";
import { useContext } from "react";
import { AccountContext } from "./Account";

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
