
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import {  useState } from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios'

function Login() {
const[values,setValues] = useState({
    username:'',
    password:''
    
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
   const  handleSubmit=(e)=>{
    e.preventDefault() 
    
    if(handleValidate()){

    }
    
   }
   //handle validation
   const handleValidate=()=>{
    const {password,username} = values ;
     if(username.length>3){
        toast.error("User Name should be greter than 3 characters",toastOptions)
        return false;
    }
   else if(password===" "){
        
        toast.error("please enter password",toastOptions)
        return false;
    }
   else if(password.length<5){
        toast.error("Password Should be equal or grether thant 8 character",toastOptions)
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
                        name='usename'
                        onChange={handleChange}
                    />
                    
                    <input type="password" placeholder='Password'
                        name='password'
                        onChange={handleChange}
                    />
                    
                    <button type='submit'>Login</button>
                    <span>Don't have an account? <NavLink to='/register'>Register</NavLink></span>
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
export default Login;