import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
export const Nav = styled.div`
  background: #0a192f;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  z-index: 10;
  /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
  color: #00c6bd;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  &.active {
    color: #ffff00;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -1.5px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 0.25rem;
  background: #f9f871;
  padding: 0.625rem 1.375rem;
  color: #000;
  outline: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  border: 1rem;
  border-radius: 2rem;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;
export const Navlogo = styled.img`
  width: 100%;
`;

export const HandleLogo = styled.div`
  max-width: 10rem;
  color: #00c6bd;
  font-weight: bold;
  font-size: 2rem;
  margin-left: 1.5rem;
  font-family: "Oooh Baby", cursive;
`;
export const YellowColor = styled.span`
  color: #f9f871;
`;
