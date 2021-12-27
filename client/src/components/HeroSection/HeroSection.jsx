import { Head, Para, Subs, CapsLetter, Logo, HandleImg } from "./HeroSectionElements";
import logo from "../../assets/images/main.png";
import { StyledBtn } from "../../assets/styles/ButtonElements";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
export default function HeroSection() {
  const { token, user } = useAuth();
  return (
    <>
      <div>
        <Head>
          Welcome to the <CapsLetter>Chat Bot.</CapsLetter>
        </Head>
        <Subs>The only human that actually listens</Subs>
        <Para>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus harum eius delectus aut iusto id quos hic fuga minus similique nihil natus, porro, tempora, eos nisi illo! In, facere
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Para>

        <Link to={token ? "/chat" : "/signin"}>
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
