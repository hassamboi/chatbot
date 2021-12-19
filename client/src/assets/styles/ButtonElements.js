import styled from "styled-components";

export const StyledBtn = styled.button`
  border-radius: 0.25rem;
  background: #F9F871;
  padding:${props => (props.zero ? "1rem 1.375rem " : "0.625rem 1.375rem")};
  color:#000;
  outline: none;
  font-size:1rem;
  margin:0 auto;
  justify-content:center;
  cursor: pointer;
  margin-bottom:1.5rem;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  border:1rem;
  font-weight:bold;
  border-radius:${props => (props.zero ? "0rem" : "2rem")};
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;`;

export const YellowColor = styled.span`
  color: #f9f871;
`;
