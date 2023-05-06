// import { Button } from 'antd'
import React from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'
import img from "../../../Assets/images/notfound.jpg"
const Notfound = () => {
  const error= useRouteError()
  const navigate = useNavigate();
  return (
    <div className='container bg-light'>
      <div className="row d-flex justify-content-center align-items-center w-75 m-auto text-center">
            <h1>Oops...!</h1>
            <p>Sorry, an unexpected error has occured</p>
      <img src={img} alt="notfound"  className='w-50 vh-50'/>
      <p>Error Is :<i>{error.statusText || error.message}</i></p>
      <p></p>
{/* <Button className='btn btn-danger' variant={Link}
onClick={()=>navigate("/" , {replace:true}) }
>HomePage</Button> */}
      </div>
  

   
      
    </div>
  )
}

export default Notfound