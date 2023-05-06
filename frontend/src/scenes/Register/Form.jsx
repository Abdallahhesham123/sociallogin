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
import { register } from "./../../state/AuthSlice/Auth.js";
import Dropzone from "react-dropzone";
import FlexBetween from "./../../components/FlexBetween.jsx";
import { toast } from "react-toastify";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const registerSchema = yup.object().shape({
    username: yup.string().required("required").min(3,"this name must greater than 3 char").max(20,"this name must less than 20 char"),
    email: yup.string().email("invalid email").required("Email is required"),
    password: yup.string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
    // picture: yup.string().required("required"),
    confirm_pass:yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Re password is Required"),
  });
  
  const initialValuesRegister = {
    username: "",
    email: "",
    password: "",
    // picture: "",
    confirm_pass:""
  };
  

const Form = () => {
  const { palette } = useTheme();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, onSubmitProps) => {
  
    dispatch(register({ formValue:values, navigate, toast }));
    onSubmitProps.resetForm();
  };

//   useEffect(() => {
//     error && toast.error(error);
//  }, [error]);
  return (
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={ initialValuesRegister }
    validationSchema={ registerSchema }
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
         
              <>
                <TextField
                  label="UserName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={
                    Boolean(touched.username) && Boolean(errors.username)
                  }
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 2" }}
                />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />
                {/* <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box> */}
              </>
      


            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />
                        <TextField
              label="confirm_pass"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirm_pass}
              name="confirm_pass"
              error={Boolean(touched.confirm_pass) && Boolean(errors.confirm_pass)}
              helperText={touched.confirm_pass && errors.confirm_pass}
              sx={{ gridColumn: "span 2" }}
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
             REGISTER
            </Button>
            <Typography
              onClick={() => {
                navigate("/login")
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
           Already have an account? Login here.
            </Typography>
            <Typography
              onClick={() => {
                navigate("/sendpasswordresetemail")
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
           ForgetPassword
            </Typography>
          </Box>
        </form>
    )}
  </Formik>
  )
}

export default Form