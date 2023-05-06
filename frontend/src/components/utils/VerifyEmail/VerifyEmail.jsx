import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import requests from "./../../../apis/verificationEmail/requests";
import validate from "./../../validation/pinCode.js";
import styled from "./verifyEmail.module.css";
const VerifyEmail = () => {
  const id = useParams().id;
  const [submitted, setSubmitted] = useState(false);
  let navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [ValidationStatus, setValidationStatus] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "warning",
    text: "",
  });
  const [values, setValues] = useState({

    f1: 0,
    f2: 0,
    f3: 0,
    f4: 0,
  });
console.log(values);
  const handleInputChange = (e) => {
    const regex = /^[0-9]{1}$/;
// console.log(!regex.test(e.target.values));
    if(regex.test(e.target.value)){
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });

    }


  };

  let payload = `${values.f1}${values.f2}${values.f3}${values.f4}` 
  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(payload);

    setSubmitted(true);
    const f1 = values.f1 ? values.f1.trim() : values.f1;
    const f2 = values.f2 ? values.f2.trim() : values.f2;
    const f3 = values.f3 ? values.f3.trim() : values.f3;
    const f4 = values.f4 ? values.f4.trim() : values.f4;
    const validationErrors = validate(f1 ,f2 ,f3 ,f4 );
    setErrors(validationErrors);
 
    let validStatus = Object.values(validationErrors).every((x) => x === "");
    console.log(validStatus);
    if (validStatus) {
      setValidationStatus(true);
    } else {
      setValidationStatus(false);
    }

  }
  useEffect(() => {

  const verification = async (dataToSend ,id) => {
  const results = await requests.verifyEmail(dataToSend , id);

  const { response, data } = results;
  console.log(results);
  if (response.ok) {
if(data){
  const err = data.message || {};
  if (err) {
    setNotification({
      show: true,
      type: "success",
      text: err,
    });
  }
}
goToHome();
  }else if (data) {
    const err = data.message || {};
    if (err) {
      setNotification({
        show: true,
        type: "warning",
        text: err,
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      
    }
  } else {
    setNotification({
      show: true,
      type: "danger",
      text: "unknownerror",
    });
  }

  }
  try {
    if (submitted) {
      if (ValidationStatus) {
        //for frontend before backend

        verification(payload , id)
        setValidationStatus(false);
      }
      setSubmitted(false);
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

  // const Regex = "\\d{1}"
//  const blockInvalidChar = (e) => Regex.test(e.target.value) && e.preventDefault();
//  console.log(blockInvalidChar);
  return (
    <div>
<div className="w-50 bg-light text-center m-auto  rounded-5">
<h2 className=" my-4 text-danger p-5 ">PIN_CODE_VERIFICATION</h2>

</div>


<form  onSubmit={handleSubmit} >
  <div className="container text-center m-5"  >
  <div className="row justify-content-center align-items-center  ">
  {notification.show && <div className={`alert alert-${notification.type}`}>{`${notification.text}`}</div>}
<div className="col-md-2">
  <div className="mb-3">
    
    <label    >

          1:
          <input  name="f1" 
          type="text" 
          onChange={handleInputChange}
          className={`${styled.otp_input}`}
          maxLength={1}

          />
        </label>
      </div>
    
      </div>
      <div className="col-md-2">
  <div className="mb-3">
 
    <label>
           2:
          <input type="text" name="f2"
           onChange={handleInputChange}
           pattern="\d{1}"
          className={`${styled.otp_input}`}
          maxLength={1}
           />
        </label>
      </div>
    
      </div>
      <div className="col-md-2">
  <div className="mb-3">

    <label>
           3:
          <input type="text" name="f3" 
          onChange={handleInputChange}
          className={`${styled.otp_input}`}
          maxLength={1}
          />
        </label>
      </div>
   
      </div>
      <div className="col-md-2">
  <div className="mb-3">
   
    <label>
           4:
          <input type="text" name="f4"
           onChange={handleInputChange}
           className={`${styled.otp_input}`}
           maxLength={1}
           />
        </label>
      </div>
     
      </div>
 
      <input type="submit" value="Submit" style={{width:"40%",marginTop:"30px"}} className="btn btn-danger"/>
      </div>
<ul className={`${styled.list}`}>
  <li>{errors.f1 ? <div className={`alert alert-danger`}>{errors.f1}</div> :"" }</li>
  <li>{errors.f2 ? <div className={`alert alert-danger`}>{errors.f2}</div> :"" }</li>
  <li>{errors.f3 ? <div className={`alert alert-danger`}>{errors.f3}</div> :"" }</li>
  <li>{errors.f4 ? <div className={`alert alert-danger`}>{errors.f4}</div> :"" }</li>
</ul>
  </div>

      
      </form>





 
    </div>
  );
};

export default VerifyEmail;
