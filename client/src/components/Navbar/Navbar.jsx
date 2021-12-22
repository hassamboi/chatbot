import React from "react";

import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink, HandleLogo } from "./NavbarElements";

export default function Navbar({ isLoggedIn }) {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <HandleLogo>Chat Bot</HandleLogo>
        </NavLink>

        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="help">Help</NavLink>

          {/* {isLoggedIn && (
            <NavBtn>
              <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavBtn>
          )} */}
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
          </NavBtn>
        </NavMenu>
      </Nav>
    </>
  );
}
