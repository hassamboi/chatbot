import { useState } from "react";
import logo from "../../assets/images/main.png";
import { StyledBtn } from "../../assets/styles/ButtonElements";
import { useForm } from "react-hook-form";
import { Container, Wrapper } from "../../assets/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { HandleImg, Logo } from "../HeroSection/HeroSectionElements";
import { Head, Form, Input, Formgroup, Linkspan, Footer, Para } from "./LoginElements";

export default function Login() {
  const baseURL = "http://localhost:5000";
  // const [isLoggedIn, setLoggedIn] = useState(true);
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = async (e, data) => {
  //   e.preventDefault();
  //   const chat = { }

  //   try {
  //     const response = await api.push("/users/register");
  //   } catch (err) {
  //     if (err.response) {
  //       console.log(err.response.data);
  //       console.log(err.response.status);
  //       console.log(err.response.headers);
  //     } else {
  //       // will give errors that are not in 200 range
  //       console.log(`Error: ${err.msg}`);
  //     }
  //   }
  // };

  const onSubmit =async data => {
    
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(json => console.log(json));

    console.log(data);
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
                    value: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
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
                    message: "Password must be atleast 7 characters",
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
