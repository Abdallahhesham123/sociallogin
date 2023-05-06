import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/utils/Layout/Layout.jsx";
import Notfound from "./components/utils/NotFound/Notfound.jsx";
import Template from "./components/utils/Template/Template.jsx";
import Home from "./scenes/homePage/index.jsx";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import Login from "./scenes/Login/Login.jsx";
import Register from "./scenes/Register/Register.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SendingEmail from './components/forgetpassword/SendingEmail.jsx';
// import ResetPasswordGeneration from './components/forgetpassword/ResetPasswordGeneration.jsx';
// import  VerifyEmail from './components/VerifyEmail/VerifyEmail.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivateRoute from "./components/utils/ProtectetedRoute/PrivateRoute.js";
function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: (
            <PrivateRoute><Template>
            <Home />
          </Template>
        </PrivateRoute>),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        // { path: "/sendpasswordresetemail", element:<SendingEmail />},
        // { path: "reset-password/:id/:token", element:  <ResetPasswordGeneration/>},
        // { path: "/verification-email/:id", element:  <VerifyEmail/>}
      ],
    },
  ]);
  return (
    <>
    <GoogleOAuthProvider clientId="821713582819-o6agrb82b46g7m0s71c96havtjd6d3m2.apps.googleusercontent.com">
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
      <ToastContainer />

    </GoogleOAuthProvider>

    </>
  );
}

export default App;
