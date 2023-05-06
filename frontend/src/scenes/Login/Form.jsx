import React ,{ useEffect, useState } from 'react'

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, loginFetch ,facebookSignIn ,GithubSignIn } from "./../../state/AuthSlice/Auth.js";
import { GoogleLogin } from '@react-oauth/google';
// import FacebookLogin from 'react-facebook-login';
import { FacebookLoginButton } from "react-social-login-buttons"
import { LoginSocialFacebook} from "reactjs-social-login"
import GitHubLogin from 'react-github-login';
import { toast } from "react-toastify";
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required(" Password is required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};


const Form = () => {
  const { palette } = useTheme();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, onSubmitProps) => {
  
    dispatch(loginFetch({ formValue:values, navigate, toast }));
    onSubmitProps.resetForm();
  };


  const responseFacebook = (res) => {
    console.log(res);
  
    dispatch(facebookSignIn({ res, navigate, toast }));
  }
  

  useEffect(() => {
    error && toast.error(error);
 }, [error]);


const onSuccess = (res) => {
  console.log(res)
  dispatch(GithubSignIn({ res, navigate, toast }));
}
const onFailure = response => console.error(response);
  return (
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={ initialValuesLogin }
    validationSchema={ loginSchema }
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
      resetForm,
    }) => (
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            label="Email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
            name="email"
            error={Boolean(touched.email) && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            label="Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            name="password"
            error={Boolean(touched.password) && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={{ gridColumn: "span 4" }}
          />
        </Box>

        {/* BUTTONS */}
        <Box>
          <Button
            fullWidth
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
           LOGIN
          </Button>
<div className="d-flex justify-content-center align-items-center p-3">
<GoogleLogin
  onSuccess={credentialResponse => {
    // console.log(credentialResponse.credential);

    dispatch(googleSignIn({ googleAccessToken:credentialResponse.credential, navigate, toast }));
    

  }}
  onError={() => {
    console.log('Login Failed');
  }}

/>

</div>



<div className="d-flex justify-content-center align-items-center p-3">

{/* <FacebookLogin
    appId="3509454319344297"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    // icon="fa-facebook"
  /> */}
<LoginSocialFacebook
appId="762510428991622"
onResolve={(res)=>{
  console.log(res)
  dispatch(facebookSignIn({res:res.data, navigate, toast }));
}}
onReject={(error)=>{
console.log(error);
}}
>
  <FacebookLoginButton/>
</LoginSocialFacebook>


<GitHubLogin 
clientId="eebd22bd3769e289696c"
redirectUri="http://localhost:3000/login" 
    onSuccess={onSuccess}
    onFailure={onFailure}
    className ="GitHub_Icon"
    />
     

</div>



  


          <Typography
            onClick={() => {
              navigate("/register")
              resetForm();
            }}
            sx={{
              textDecoration: "underline",
              color: palette.primary.main,
              "&:hover": {
                cursor: "pointer",
                color: palette.primary.light,
              },
            }}
          >
    Don't have an account? Sign Up here.
          </Typography>
        </Box>
      </form>
    )}
  </Formik>
  )
}

export default Form