import { yupResolver } from "@hookform/resolvers/yup";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import firebase from "../utils/firebase";
import Input from "./input";
import InputPassword from "./inputPassword";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const commonStyles = {
  bgcolor: "background.paper",
  m: 1,
  border: 1,
  width: "5rem",
  height: "5rem",
};

const GoogleIcon = () => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="18px"
    height="18px"
    viewBox="0 0 48 48"
  >
    <g>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      ></path>
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      ></path>
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      ></path>
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      ></path>
      <path fill="none" d="M0 0h48v48H0z"></path>
    </g>
  </svg>
);

export default function LoginForm() {
  const [inCorrect, setInCorrect] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const route = useRouter();
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  
  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    handleToggleBackdrop();
    if(isLogin) 
      handleOnSubmitLogin(data.email, data.password)
    else
      handleOnSubmitRegister(data.email, data.password)
    return false;
  }

  const handleOnSubmitGoogle = () => {
    handleToggleBackdrop();
    const provider = new GoogleAuthProvider();
    const auth = firebase.auth;

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem('userId', user.uid);
        setInCorrect(false);
        route.push("/articles");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setInCorrect(true);
        handleCloseBackdrop();
      });
  };

  const handleOnSubmitLogin = (email, password) => {
    const auth = firebase.auth;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem('userId', user.uid);
        setInCorrect(false);
        route.push("/articles");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setInCorrect(true);
        handleCloseBackdrop();
      });
  };

  const handleSwitchLogin = () => {
    setInCorrect(false);
    reset();
    setIsLogin(!isLogin);
  }

  const handleOnSubmitRegister = (email, password) => {
    const auth = firebase.auth;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      setIsLogin(!isLogin);
      handleCloseBackdrop();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      handleCloseBackdrop();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Box sx={{ ml: "20%", mt: "25%", pr: "20%" }}> */}
      <Box className="login-inner-box">
        <Typography
          component="p"
          color="#667080"
          fontSize="32px"
          fontWeight="bold"
          // sx={{ p: 1 }}
        >
          {isLogin ? "Login" : "Register"}
        </Typography>

        <Box
          sx={{ ...commonStyles, borderRadius: 1, width: 1, p: 2 }}
          style={{
            borderColor: "#F6CA56",
            borderStyle: "dashed",
            height: "37%",
          }}
        >
          <div
            style={{
              color: "red",
              textAlign: "center",
              display: inCorrect ? "block" : "none",
            }}
          >
            The email or password is incorrect
          </div>
          <Input
            label="Email"
            placeHolder="Email address"
            icon={<MailOutlineIcon sx={{ color: "#979797" }} />}
            errors={errors.email?.message}
            validate={{...register('email')}}
          />
          <InputPassword errors={errors.password?.message} validate={{...register('password')}}/>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // mt: 1,
            }}
          >
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remember password"
              sx={{
                color: "#667080",
                "& .MuiTypography-root": { fontSize: "14px" },
                "& .MuiSvgIcon-root": { color: "#B2B7BF" },
              }}
            />
            <Typography component="a" color="#0386D0" fontSize="14px" href="#">
              Forgot password
            </Typography>
          </Box>
          {isLogin ? (
            <Typography component="p" color="#667080" fontSize="16px" href="#" onClick={handleSwitchLogin}>
              Don&rsquo;t have an account?&nbsp;
              <Typography
                component="a"
                color="#0386D0"
                fontSize="16px"
                href="#"
              >
                Register here
              </Typography>
            </Typography>
          ) : (
            <Typography component="p" color="#667080" fontSize="16px" href="#" onClick={handleSwitchLogin}>
              Have an account?&nbsp;
              <Typography
                component="a"
                color="#0386D0"
                fontSize="16px"
                href="#"
              >
                Login here
              </Typography>
            </Typography>
          )}

          {/* <Link href="/articles">
            <Button
              variant="text"
              sx={{
                background: "#FAE4AA",
                color: "#667080",
                width: 1,
                mt: 1,
                ":hover": {
                  background: "#F6CA56",
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          </Link> */}
          <Button
            type="submit"
            variant="text"
            // onClick={isLogin ? handleOnSubmitLogin : handleOnSubmitRegister}
            sx={{
              background: "#FAE4AA",
              color: "#667080",
              width: 1,
              mt: 1,
              ":hover": {
                background: "#F6CA56",
                color: "white",
              },
            }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
          <Button
            variant="text"
            onClick={handleOnSubmitGoogle}
            sx={{
              background: "#3283fc",
              color: "white",
              width: 1,
              mt: 1,
              ":hover": {
                background: "#3283fccc",
                color: "white",
              },
            }}
          >
            <Box
              sx={{
                background: "white",
                display: "flex",
                alignItems: "center",
                position: "absolute",
                left: "1%",
                height: "86%",
                width: "7%",
                justifyContent: "center",
              }}
            >
              <GoogleIcon />
            </Box>
            Sign in with Google
          </Button>
          <Typography
            component="p"
            color="#667080"
            fontSize="16px"
            href="#"
            sx={{ mt: 2 }}
          >
            By signing in you are agreeing our&nbsp;
            <Typography component="a" color="#0386D0" fontSize="14px" href="#">
              Term and privacy policy
            </Typography>
          </Typography>
        </Box>
      </Box>
      <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleCloseBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
    </form>
  );
}
