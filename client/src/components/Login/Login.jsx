import { useState } from "react";
import logo from "../../assets/images/main.png";
import { StyledBtn } from "../../assets/styles/ButtonElements";
import { useForm } from "react-hook-form";
import { Container, Wrapper } from "../../assets/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { HandleImg, Logo } from "../HeroSection/HeroSectionElements";
import { Head, Form, Input, Formgroup, Linkspan, Footer, Para } from "./LoginElements";
import api from "../../api/chats";

export default function Login() {
  // const [isLoggedIn, setLoggedIn] = useState(true);
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    // if (Object.keys(errors).length === 0)
    navigate("/");
  };
  const setEmail = () => {};
  const setPassword = () => {};

  // <Navbar isLoggedIn={isLoggedIn} />;
  return (
    <Container>
      <Wrapper>
        <div>
          <Head>Access your account</Head>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Formgroup>
              <label>Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={e => setEmail(e.target.value)}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    message: "This is not a valid email address",
                  },
                })}
              />
              <Para>{errors.email?.message}</Para>
            </Formgroup>

            <Formgroup>
              <label>Password </label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={e => setPassword(e.target.value)}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 7,
                    message: "Password must be more than 4 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Password cannot exceed more than 15 characters",
                  },
                })}
              />
              <Para>{errors.password?.message}</Para>
            </Formgroup>

            <StyledBtn>Log in</StyledBtn>
            {/* <Styledbtn></Styledbtn> */}
          </Form>

          <Footer>
            Don't have an account?{" "}
            <Linkspan
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </Linkspan>
          </Footer>
        </div>
        <HandleImg>
          <Logo src={logo} />
        </HandleImg>
      </Wrapper>
    </Container>
  );
}
