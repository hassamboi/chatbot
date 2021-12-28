import logo from "../../assets/images/main.png";
import { StyledBtn } from "../../assets/styles/ButtonElements";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Head, Form, Input, Formgroup, Linkspan, Footer, Para } from "./FormElements";
import { Container, Wrapper } from "../../assets/styles";
import { HandleImg, Logo } from "../HeroSection/HeroSectionElements";
import api from "../../api/posts";

export default function SignUp({ setisLoggedIn }) {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async formData => {
    try {
      const response = await api.post("/users/register", formData);
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
    navigate("/signin");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <div>
            <Head>Create a new account</Head>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Formgroup>
                <label>Email </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
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
                <label>Name </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[a-zA-Z\-]+$/,
                      message: "This is not a valid name",
                    },
                  })}
                />
                <Para>{errors.name?.message}</Para>
              </Formgroup>
              <Formgroup>
                <label>Password </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
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
              <StyledBtn>Register</StyledBtn>
            </Form>

            <Footer>
              Already have an account?{" "}
              <Linkspan
                onClick={() => {
                  setisLoggedIn(true);
                }}
              >
                Sign in
              </Linkspan>
            </Footer>
          </div>

          <HandleImg>
            <Logo src={logo} />
          </HandleImg>
        </Wrapper>
      </Container>
    </>
  );
}
