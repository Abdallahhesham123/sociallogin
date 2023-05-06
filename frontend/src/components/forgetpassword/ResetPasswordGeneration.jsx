import { Box, TextField, Button, Alert, Grid, Typography, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';
import validate from "./../validation/chan_pass_Validation/ChangeValidation";
import requests from "./../../apis/resetpasswordGen/requests"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Header from "./../utils/Header/Header.jsx";

const useStyles = makeStyles({
  root: {
    margin: " auto" ,
    maxWidth:"70%",
    padding:"0.2rem",

  },
  
    form:{
      margin: "100px auto" ,
      width:"100%",
  
    },
    Header:{
      backgroundColor: "lightblue" ,
      textAlign:"center",
      color:"teal",
      padding:"10px 0"
  
    },
    notification:{
      marginBottom:"20px"
    },
    footer:{
   marginTop:"30px",
  textAlign:"center",
   width:"100%",
    }
    ,password:{
  
      position: "relative",
      
    },icon:{
  
      
        position: "absolute",
        top: "1.5rem",
        right: "0.5rem",
        cursor: "pointer"
      
    }
});

const ChangePassword = (props) => {
    const {id ,token}= useParams();
  const classes = useStyles(props)
  const [showoldPassword, setShowoldPassword] = useState(false);
  const toggleoldPassword = () => {
      setShowoldPassword(!showoldPassword);
    };
    const [showcomPassword, setShowcomPassword] = useState(false);
    const togglecomPassword = () => {
        setShowcomPassword(!showcomPassword);
      };
  const [values, setValues] = useState({ password: "", confirm_pass: "" });
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [ValidationStatus, setValidationStatus] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "warning",
    text: "",
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true)

    //validation-start-frontend
          const password = values.password ? values.password.trim() : values.password;
          const confirm_pass = values.confirm_pass ? values.confirm_pass.trim() : values.confirm_pass;


          const validationErrors = validate(password, confirm_pass);
          setErrors(validationErrors);
          let validStatus = Object.values(validationErrors).every((x)=> x === "")
          if(validStatus){
          setValidationStatus(true);
          }else{
          setValidationStatus(false);
          }
          // validation-end-frontend
    // send values to back end
    // calling the api
  };
  useEffect(()=>{

    const sendPost= async(dataToSend ,id ,token)=>{
  
      const results= await requests.resetpasswordG(dataToSend ,id ,token);
    
    
      const {response, data }=results
      console.log(response ,data);
      if(response.ok){
        setNotification({
    
          show:true,
          type: 'success',
          text:"Congratulation , your password change Successfully "
        })
        setTimeout(() => {
          goToHome();
        }, 2000);
   
      }else if(data.message){
        const err = data.message || {}
        if(err){
          setNotification({
    
            show:true,
            type: 'warning',
            text:data.message 
          })
    
        }
    
      }else{
        setNotification({
    
          show:true,
          type: 'error',
          text:"unknownerror"
        })
        
      }
    
    }
    try {
    if (submitted) {
      if(ValidationStatus){ //for frontend before backend
        console.log(id);
        console.log(token);
            sendPost(values , id ,token)
            setValidationStatus(false)
          }
      setSubmitted(false)
    }
    
       
      // validation-start-frontend
    
      // validation-end-frontend
    } catch (error) {
    
      console.log(error);
      
    }
        
      },[submitted])
    
      let goToHome = () => {
      
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      };
      

  return <>

<Paper sx={{ maxWidth: "90%", m: "10px auto", p: 2 ,borderRadius:"20px", boxShadow: 3}}>

<Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="FORM TO RESET PASSWORD " subtitle="Update your Password" />
        <Grid container justifyContent="center">
  <Grid item sm={6} xs={12}>
    <Grid item  xs={12} >

    <Box
     sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}
     className={classes.root}
     >
                <Grid item  xs={12} >
              <Typography component="h3" variant ="h3" gutterBottom className={classes.Header}>

                RESET-PASSWORD
              </Typography>

          </Grid>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form" className={classes.form}>
      <div className={classes.password}>
      <TextField 
        margin="normal"
         required fullWidth 
         name="password"
          label="New Password"
          type={showoldPassword ? "text" : "password"}
            id="password" 
            value={values.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password && errors.password}
            />

<div className={classes.icon} onClick={toggleoldPassword}>
        {showoldPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
      </div>
      <div className={classes.password}>

      <TextField margin="normal" required fullWidth
         name="confirm_pass" 
        label="Confirm New Password" 
        type={showcomPassword ? "text" : "password"}
        id="password_confirmation" 
        value={values.confirm_pass}
        onChange={handleInputChange}
        error={!!errors.confirm_pass}
        helperText={errors.confirm_pass && errors.confirm_pass}
        />

<div className={classes.icon} onClick={togglecomPassword}>
        {showcomPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>

      </div>

        <Box textAlign='center'>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
        </Box>
        {notification.show ? <Alert severity={notification.type}>{notification.text}</Alert> : ""}
      </Box>
    </Box>
      </Grid>
      </Grid>

  </Grid>
        </Box>
        </Box>
        </Paper>


  </>;
};

export default ChangePassword;
