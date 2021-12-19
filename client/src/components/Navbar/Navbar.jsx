import React from "react";

import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  HandleLogo,
  Navlogo,
} from "./NavbarElements";

import navlogo from "../../assets/images/navlogo.png";
export default function Navbar({ isLoggedIn }) {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <HandleLogo>Chat Bot</HandleLogo>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/services" activeStyle>
            Services
          </NavLink>
          <NavLink to="help" activeStyle>
            Help
          </NavLink>

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
