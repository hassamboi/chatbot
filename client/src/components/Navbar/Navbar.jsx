import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, HandleLogo } from "./NavbarElements";

export default function Navbar() {
  const { logoutUser, token } = useAuth();
  // const token = localStorage.getItem("token");
  return (
    <Nav>
      <NavLink to="/">
        <HandleLogo>Chat Bot</HandleLogo>
      </NavLink>
      <NavMenu>
        {token && <NavLink to="/chat">Chat</NavLink>}
        <NavBtn>
          {token && (
            <NavBtnLink
              onClick={() => {
                logoutUser();
              }}
              to="/"
            >
              Log out
            </NavBtnLink>
          )}
          {!token && <NavBtnLink to="/signin">Sign in</NavBtnLink>}
        </NavBtn>
      </NavMenu>
    </Nav>
  );
}
