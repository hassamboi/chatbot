import { Head, Para, Subs, CapsLetter, Logo, HandleImg, MediaHandler } from "./HeroSectionElements";
import logo from "../../assets/images/main.png";
import { StyledBtn } from "../../assets/styles/ButtonElements";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
export default function HeroSection() {
  const { token } = useAuth();
  return (
    <>
      <div>
        <Head>
          Welcome to the <CapsLetter>Chat Bot.</CapsLetter>
        </Head>
        <Subs>The only human that actually listens</Subs>
        <Para>A chatbot is software that simulates human-like conversations with users via text messages on chat. Its key task is to help users by providing answers to their questions.</Para>

        <Link to={token ? "/chat" : "/register"}>
          <StyledBtn zero onClick={() => {}}>
            Start Chatting
          </StyledBtn>
        </Link>
      </div>
      <HandleImg>
        <Logo src={logo} />
      </HandleImg>
    </>
  );
}
