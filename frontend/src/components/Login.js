import React, { useState, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const loginUser = async () =>{
        console.log(email,password);
        let result = await fetch('http://127.0.0.1:5000/login',{
            method : 'post',
            body : JSON.stringify({email,password}),
            headers : {
                'Content-Type':'application/json'
            }
        });

        result = await result.json();
        console.log(result);

        if(result.auth){
            setTimeout(() => {
              localStorage.setItem("users",JSON.stringify(result.user));
              localStorage.setItem("token",JSON.stringify(result.auth));
              navigate('/');
            }, 1000);

            toast.success("Login Successfull!!",{
              position: "top-right",
              autoClose : 2000,
              hideProgressBar : false,
            progress : undefined
            });

        }
        else{
            // alert("Please enter correct details!!")
          toast.error("Please enter correct details!!",{
            position: "top-right",
            autoClose : 2000,
            hideProgressBar : false,
            progress : undefined
          });
        }
    }

    useEffect(() => {
        const auth = localStorage.getItem("users");
        if (auth) {
          navigate('/');
        }
    })
     
  return (
    <div className='login'> 
      <h1>Login</h1>
      <input className='inputBox' value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='Enter Email'/>
      <input className='inputBox' value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Enter Password' />
      <button className='appButton' onClick={loginUser} type='button'>Login</button>
      <p>New user  <Link to="/signup"> <span>Sign up</span></Link></p>
      <ToastContainer/>
    </div>
    

  )
}

export default Login
