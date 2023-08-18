
import styled from 'styled-components'

import { useNavigate,NavLink  } from "react-router-dom";
 import { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function Register() {
  const navigate = useNavigate();
const[values,setValues] = useState({
    username:'',
    email:'',
    password:'',
    confirmpassword:'',
})
const toastOptions={
    position:'bottom-right',
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:'dark'
}
    //handle change
    const handleChange = (e) => {
        const{name, value} = e.target;
setValues((oldvalue)=>(
    {...oldvalue,[name]:value}
))
    }
    //handle submit
   const  handleSubmit=async(e)=>{
    e.preventDefault() 
    
    if (handleValidation()) {
     
      const { data } = await axios.post("http://localhost:9090/user/register", values);

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        console.log(data.user)
        localStorage.setItem(
          "chat-app-current-user",
          JSON.stringify(data.user)
        );
        alert("okk")
        navigate("/chat");
      }
    }
   }
   //handle validation
   const handleValidation=()=>{
    const {password,confirmpassword,email,username} = values ;
     if(username===''){
        toast.error("Email is required",toastOptions)
        return false;
    }
   else if(password!==confirmpassword){
        
        toast.error("password and confirmpassword do not match",toastOptions)
        return false;
    }
   else if(password.length<3){
        toast.error("Password Should be equal or grether thant 8 character",toastOptions)
        return false;
    }else if(email===""){
        toast.error("Email is required",toastOptions)
        return false;
    }
    return true;
   }
    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Liveline_with_Mason%2C_radio_show_logo.png" alt="" />
                        <h1>Live Line</h1>
                    </div>
                    <input type="text" placeholder='User Name'
                        name='username'
                        value={values.username}
                        onChange={handleChange}
                    />
                    <input type="text" placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                    />
                    <input type="password" placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={values.password}
                    />
                    <input type="password" placeholder='Confirm Password'
                        name='confirmpassword'
                        onChange={handleChange}
                        values={values.confirmpassword}
                    />
                    <button type='submit'>Create user</button>
                    <span>already have an account? <NavLink to='/login'>login</NavLink></span>
                </form>
            </FormContainer>
            <ToastContainer></ToastContainer>
        </>
    )
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 3rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #00000076;
  border-radius: 2rem;
  padding: 3rem 5rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
}
button {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
span {
  color: white;
  text-transform: uppercase;
  a {
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
}
`;
export default Register