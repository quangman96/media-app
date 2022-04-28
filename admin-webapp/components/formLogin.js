// // import Box from '@mui/material/Box';
// // import TextField from '@mui/material/TextField';

// // export default function FormLogin() {
// //     return (
// // <Box
// //       component="form"
// //       sx={{
// //         '& .MuiTextField-root': { m: 1, width: '25ch' },
// //       }}
// //       noValidate
// //       autoComplete="off"
// //     >
// //       <div>
// //         <TextField
// //           required
// //           id="outlined-required"
// //           label="Required"
// //           defaultValue="Hello World"
// //         />
// //         <TextField
// //           disabled
// //           id="outlined-disabled"
// //           label="Disabled"
// //           defaultValue="Hello World"
// //         />
// //         <TextField
// //           id="outlined-password-input"
// //           label="Password"
// //           type="password"
// //           autoComplete="current-password"
// //         />
// //         <TextField
// //           id="outlined-read-only-input"
// //           label="Read Only"
// //           defaultValue="Hello World"
// //           InputProps={{
// //             readOnly: true,
// //           }}
// //         />
// //         <TextField
// //           id="outlined-number"
// //           label="Number"
// //           type="number"
// //           InputLabelProps={{
// //             shrink: true,
// //           }}
// //         />
// //         <TextField id="outlined-search" label="Search field" type="search" />
// //         <TextField
// //           id="outlined-helperText"
// //           label="Helper text"
// //           defaultValue="Default Value"
// //           helperText="Some important text"
// //         />
// //       </div>
// //       <div>
// //         <TextField
// //           required
// //           id="filled-required"
// //           label="Required"
// //           defaultValue="Hello World"
// //           variant="filled"
// //         />
// //         <TextField
// //           disabled
// //           id="filled-disabled"
// //           label="Disabled"
// //           defaultValue="Hello World"
// //           variant="filled"
// //         />
// //         <TextField
// //           id="filled-password-input"
// //           label="Password"
// //           type="password"
// //           autoComplete="current-password"
// //           variant="filled"
// //         />
// //         <TextField
// //           id="filled-read-only-input"
// //           label="Read Only"
// //           defaultValue="Hello World"
// //           InputProps={{
// //             readOnly: true,
// //           }}
// //           variant="filled"
// //         />
// //         <TextField
// //           id="filled-number"
// //           label="Number"
// //           type="number"
// //           InputLabelProps={{
// //             shrink: true,
// //           }}
// //           variant="filled"
// //         />
// //         <TextField
// //           id="filled-search"
// //           label="Search field"
// //           type="search"
// //           variant="filled"
// //         />
// //         <TextField
// //           id="filled-helperText"
// //           label="Helper text"
// //           defaultValue="Default Value"
// //           helperText="Some important text"
// //           variant="filled"
// //         />
// //       </div>
// //       <div>
// //         <TextField
// //           required
// //           id="standard-required"
// //           label="Required"
// //           defaultValue="Hello World"
// //           variant="standard"
// //         />
// //         <TextField
// //           disabled
// //           id="standard-disabled"
// //           label="Disabled"
// //           defaultValue="Hello World"
// //           variant="standard"
// //         />
// //         <TextField
// //           id="standard-password-input"
// //           label="Password"
// //           type="password"
// //           autoComplete="current-password"
// //           variant="standard"
// //         />
// //         <TextField
// //           id="standard-read-only-input"
// //           label="Read Only"
// //           defaultValue="Hello World"
// //           InputProps={{
// //             readOnly: true,
// //           }}
// //           variant="standard"
// //         />
// //         <TextField
// //           id="standard-number"
// //           label="Number"
// //           type="number"
// //           InputLabelProps={{
// //             shrink: true,
// //           }}
// //           variant="standard"
// //         />
// //         <TextField
// //           id="standard-search"
// //           label="Search field"
// //           type="search"
// //           variant="standard"
// //         />
// //         <TextField
// //           id="standard-helperText"
// //           label="Helper text"
// //           defaultValue="Default Value"
// //           helperText="Some important text"
// //           variant="standard"
// //         />
// //       </div>
// //     </Box>
// //   );
// // }

// // import React, { useState } from "react";
// // import {Button, Paper, TextField} from "@mui/material"
// // import { useForm, Controller } from 'react-hook-form'

// // export default function FormLogin() {
// //   const [textValue, setTextValue] = useState("");

// // //   const onTextChange = (e) => setTextValue(e.target.value);
// // //   const handleSubmit = () => console.log(textValue);
// // //   const handleReset = () => setTextValue("");

// //   return (
// // <Controller
// //     control={control}
// //     name='muiTextField'
// //     defaultValue="Hello World"
// //     render={({ field }) => (
// //         <TextField
// //             {...field}
// //             id="outlined-required"
// //             label="Required"
// //         />
// //     )}
// //     rules={{ required: true }}
// // />
// // {errors.muiTextField && <span>This date field is required</span>}

// //   );
// // };

// // import React from "react";
// // import { useForm } from "react-hook-form";
// // import { TextField, Button } from "@mui/material";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import * as Yup from "yup";

// // // export default function FormLogin () {
// // //   const { register, handleSubmit } = useForm<validationSchema>({
// // //     mode: 'onChange',
// // //   });

// // export default function FormLogin() {
// //   // form validation rules
// //   const validationSchema = Yup.object().shape({
// //     title: Yup.string().required("Title is required"),
// //     firstName: Yup.string().required("First Name is required"),
// //     lastName: Yup.string().required("Last name is required"),
// //     dob: Yup.string()
// //       .required("Date of Birth is required")
// //       .matches(
// //         /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
// //         "Date of Birth must be a valid date in the format YYYY-MM-DD"
// //       ),
// //     email: Yup.string().required("Email is required").email("Email is invalid"),
// //     password: Yup.string()
// //       .min(6, "Password must be at least 6 characters")
// //       .required("Password is required"),
// //     confirmPassword: Yup.string()
// //       .oneOf([Yup.ref("password"), null], "Passwords must match")
// //       .required("Confirm Password is required"),
// //     acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
// //   });
// //   const formOptions = { resolver: yupResolver(validationSchema) };

// //   // get functions to build form with useForm() hook
// //   const { register, handleSubmit, reset, formState } = useForm(formOptions);
// //   const { errors } = formState;

// //   function onSubmit(data) {
// //     console.log(data);
// //     // display form data on success
// //     alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
// //     return false;
// //   }

// //   return (
// //     <form onSubmit={handleSubmit(onSubmit)}>
// //       <TextField {...register("username")} name="username" label="Username" />
// //       <TextField
// //         {...register("email")}
// //         name="email"
// //         label="Email"
// //         error={!!errors.email}
// //         helperText={errors.email && errors?.username?.message}
// //       />
// //       <div>{errors.email?.message}</div>
// //       <TextField
// //         {...register("password")}
// //         name="password"
// //         label="Password"
// //         type="password"
// //       />
// //       <Button type="submit">Register</Button>
// //     </form>
// //   );
// // }

// // import { useForm } from 'react-hook-form';
// // import { yupResolver } from '@hookform/resolvers/yup';
// // import * as Yup from 'yup';

// // export default function LoginForm() {
// //     // form validation rules
// //     const validationSchema = Yup.object().shape({
// //         // title: Yup.string()
// //         //     .required('Title is required'),
// //         // firstName: Yup.string()
// //         //     .required('First Name is required'),
// //         // lastName: Yup.string()
// //         //     .required('Last name is required'),
// //         // dob: Yup.string()
// //         //     .required('Date of Birth is required')
// //         //     .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
// //         email: Yup.string()
// //             .required('Email is required')
// //             .email('Email is invalid'),
// //         password: Yup.string()
// //             .min(6, 'Password must be at least 6 characters')
// //             .required('Password is required'),
// //         // confirmPassword: Yup.string()
// //         //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
// //         //     .required('Confirm Password is required'),
// //         acceptTerms: Yup.bool()
// //             .oneOf([true], 'Accept Ts & Cs is required')
// //     });
// //     const formOptions = { resolver: yupResolver(validationSchema) };

// //     // get functions to build form with useForm() hook
// //     const { register, handleSubmit, reset, formState } = useForm(formOptions);
// //     const { errors } = formState;

// //     function onSubmit(data) {
// //         // display form data on success
// //         alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
// //         return false;
// //     }

// //     return (
// //         <div className="card m-3">
// //             <h5 className="card-header">Next.js - Form Validation Example</h5>
// //             <div className="card-body">
// //                 <form onSubmit={handleSubmit(onSubmit)}>
// //                     <div className="form-row">
// //                         <div className="form-group col">
// //                             <label>Email</label>
// //                             <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
// //                             <div className="invalid-feedback">{errors.email?.message}</div>
// //                         </div>
// //                     </div>
// //                     <div className="form-row">
// //                         <div className="form-group col">
// //                             <label>Password</label>
// //                             <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
// //                             <div className="invalid-feedback">{errors.password?.message}</div>
// //                         </div>
// //                     </div>

// //                     <div className="form-group form-check">
// //                         <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
// //                         <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
// //                         <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
// //                     </div>
// //                     <div className="form-group">
// //                         <button type="submit" className="btn btn-primary mr-1">Register</button>
// //                         <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
// //                     </div>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }

// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as Yup from 'yup';
// import Input from './input';
// import {Box, Typography} from '@mui/material';

// const commonStyles = {
//   bgcolor: 'background.paper',
//   m: 1,
//   border: 1,
//   width: '5rem',
//   height: '5rem',
// };

// export default function LoginForm() {
//     // form validation rules
//     const validationSchema = Yup.object().shape({
//         // title: Yup.string()
//         //     .required('Title is required'),
//         // firstName: Yup.string()
//         //     .required('First Name is required'),
//         // lastName: Yup.string()
//         //     .required('Last name is required'),
//         // dob: Yup.string()
//         //     .required('Date of Birth is required')
//         //     .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
//         email: Yup.string()
//             .required('Email is required')
//             .email('Email is invalid'),
//         password: Yup.string()
//             .min(6, 'Password must be at least 6 characters')
//             .required('Password is required'),
//         // confirmPassword: Yup.string()
//         //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         //     .required('Confirm Password is required'),
//         acceptTerms: Yup.bool()
//             .oneOf([true], 'Accept Ts & Cs is required')
//     });
//     const formOptions = { resolver: yupResolver(validationSchema) };

//     // get functions to build form with useForm() hook
//     const { register, handleSubmit, reset, formState } = useForm(formOptions);
//     const { errors } = formState;

//     function onSubmit(data) {
//         // display form data on success
//         alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
//         return false;
//     }

//     const icon = {<MailOutlineIcon style={iconStyle} />}
//     return (
//         <Box sx={{ml: '20vh'}}>
//                                   <Typography
//               component="p"
//               color="#667080"
//               fontSize="32px"
//               fontWeight="bold"
//               sx={{ p: 1 }}
//             >
//               Login
//             </Typography>

//             <Box
//             sx={{ ...commonStyles, borderRadius: 1, width: 1}}
//             style={{borderColor: '#F6CA56', borderStyle: 'dashed', height: '65vh'}}
//         >

//         <Input label="Email" placeHolder="Email address" icon={} />
//         <Input label="Password" placeHolder="Password" />
//         </Box>
//         </Box>

//         // <div className="card m-3">
//         //     <h5 className="card-header">Login</h5>
//         //     <div className="card-body">
//         //         <form onSubmit={handleSubmit(onSubmit)}>
//         //             <div className="form-row">
//         //                 <div className="form-group col">
//         //                     <label>Email</label>
//         //                     <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
//         //                     <div className="invalid-feedback">{errors.email?.message}</div>
//         //                 </div>
//         //             </div>
//         //             <div className="form-row">
//         //                 <div className="form-group col">
//         //                     <label>Password</label>
//         //                     <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
//         //                     <div className="invalid-feedback">{errors.password?.message}</div>
//         //                 </div>
//         //             </div>

//         //             <div className="form-group form-check">
//         //                 <input name="acceptTerms" type="checkbox" {...register('acceptTerms')} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
//         //                 <label htmlFor="acceptTerms" className="form-check-label">Accept Terms & Conditions</label>
//         //                 <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
//         //             </div>
//         //             <div className="form-group">
//         //                 <button type="submit" className="btn btn-primary mr-1">Register</button>
//         //                 <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
//         //             </div>
//         //         </form>
//         //     </div>
//         // </div>
//     );
// }

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from "./input";
import InputPassword from "./inputPassword";
import { Box, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "next/link";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "../utils/firebase";
import { useState } from "react";
import { useRouter } from "next/router";
import useFirebaseAuth from "../utils/useFirebaseAuth";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inCorrect, setInCorrect] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const route = useRouter();
  // form validation rules
  const validationSchema = Yup.object().shape({
    // title: Yup.string()
    //     .required('Title is required'),
    // firstName: Yup.string()
    //     .required('First Name is required'),
    // lastName: Yup.string()
    //     .required('Last name is required'),
    // dob: Yup.string()
    //     .required('Date of Birth is required')
    //     .matches(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/, 'Date of Birth must be a valid date in the format YYYY-MM-DD'),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    // confirmPassword: Yup.string()
    //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
    //     .required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

  const handleOnSubmitGoogle = () => {
    console.log("google");
    const provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // const auth = getAuth();
    // auth.languageCode = 'it'
    const auth = firebase.auth;

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(credential);
        console.log(token);
        console.log(user);
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
      });
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnSubmitLogin = () => {
    console.log("login");
    const auth = firebase.auth;
    // createUserWithEmailAndPassword(auth, "admin2@gmail.com", "123456")
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   console.log(user)
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ..
    // });
    // useFirebaseAuth.signInWithEmailAndPassword2(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setInCorrect(false);
        route.push("/articles");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        setInCorrect(true);
      });
  };

  const handleSwitchLogin = () => {
    setInCorrect(false);
    setEmail("");
    setPassword("");
    setIsLogin(!isLogin);
  }

  const handleOnSubmitRegister = () => {
    const auth = firebase.auth;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user)
      setIsLogin(!isLogin);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  };

  return (
    <form>
      <Box sx={{ ml: "20%", mt: "25%", pr: "20%" }}>
        <Typography
          component="p"
          color="#667080"
          fontSize="32px"
          fontWeight="bold"
          sx={{ p: 1 }}
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
            onChangeEvent={handleOnChangeEmail}
            value={email}
          />
          <InputPassword onChangeEvent={handleOnChangePassword} value={password} />

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
              Don't have an account?&nbsp;
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
            variant="text"
            onClick={isLogin ? handleOnSubmitLogin : handleOnSubmitRegister}
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
    </form>
  );
}
