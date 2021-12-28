import Login from "../components/Forms/Login";
import Signup from "../components/Forms/SignUp";
import { useState } from "react";

export default function Register() {
  const [isLoggedIn, setisLoggedIn] = useState(true);
  return <>{isLoggedIn ? <Login setisLoggedIn={setisLoggedIn} /> : <Signup setisLoggedIn={setisLoggedIn} />}</>;
}
