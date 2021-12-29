import logo from "../../assets/images/main.png";
import { StyledBtn } from "../../assets/styles/ButtonElements";
import { useForm } from "react-hook-form";
import { Container, Wrapper } from "../../assets/styles";
import { useNavigate } from "react-router-dom";
import { HandleImg, Logo } from "../HeroSection/HeroSectionElements";
import { Head, Form, Input, Formgroup, Linkspan, Footer, Para } from "./FormElements";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/posts";

export default function Login({ setisLoggedIn }) {
  const { loginUser } = useAuth();
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async formData => {
    try {
      const response = await api.post("/users/login", formData).then(userData => {
        console.log(userData.data);
        loginUser(userData.data);
        navigate("/");
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

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
          </Form>

          <Footer>
            Don't have an account?{" "}
            <Linkspan
              onClick={() => {
                setisLoggedIn(false);
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
