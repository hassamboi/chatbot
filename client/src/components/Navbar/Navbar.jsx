import React from "react";
import { useAuth } from "../../hooks/useAuth";
// import { useUser } from "../../hooks/useUser";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, HandleLogo } from "./NavbarElements";

export default function Navbar() {
  const checkToken = localStorage.getItem('token');
  if (checkToken) {
    console.log("Found token")
  }
  const{logoutUser} = useAuth();
  // const { token, setToken, unsetToken } = useUser();
  return (
    <Nav>
      <NavLink to="/">
        <HandleLogo>Chat Bot</HandleLogo>
      </NavLink>

      <NavMenu>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="help">Help</NavLink>


        <NavBtn>
          { checkToken && <NavBtnLink onClick={() => {logoutUser()}} to="/">Log out</NavBtnLink>}
          {!checkToken && <NavBtnLink to="/signin">Sign in</NavBtnLink>}
        </NavBtn>
       
      </NavMenu>
    </Nav>
  );
}
