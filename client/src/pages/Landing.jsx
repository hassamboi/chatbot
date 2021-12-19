import { useState } from "react";
import { Wrapper, Container } from "../assets/styles";
import HeroSection from "../components/HeroSection/HeroSection";
import Navbar from "../components/Navbar/Navbar";
export default function Landing() {

  const [isLoggedIn, setisLoggedIn] = useState(false);
  <Navbar isLoggedIn={isLoggedIn}/>
  return (
    <>
      <Container>
        <Wrapper>
          <HeroSection />
        </Wrapper>
      </Container>
    </>
  );
}
