import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
         Abdallah-Eshop-Login
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h6" sx={{margin:"10px auto" ,textAlign:"center" ,fontSize:"20px",color:"red"}}>
          Welcome Back to AbdallahSite, Welcome to Abdallah-Eshop!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
}

export default Login