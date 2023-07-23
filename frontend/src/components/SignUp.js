import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const collectData = async () => {
    console.log(name, email, password);

    if (name && email && password) {
      let result = await fetch('http://127.0.0.1:5000/register', {
        method: 'post',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      result = await result.json();
      console.log(result);

      if (result) {
        setTimeout(()=>{
          navigate('/');
        },2000)
        toast.success("Sign Up Successfull!!",{
          position: "top-right",
          autoClose : 2000,
          hideProgressBar : false,
        progress : undefined
        });
      }

      //storing data in local storage
      localStorage.setItem("users",JSON.stringify(result.result));
      localStorage.setItem("token",JSON.stringify(result.auth));
    }

    else{
      alert("Please fill all entries!!");
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate('/');
    }
  })

  return (
    <div className='register'>
      <h1>Register</h1>
      <input type="text" className="inputBox" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name' />
      <input type="email" className="inputBox" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Email' />
      <input type="password" className="inputBox" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter Password' />
      <button type='button' onClick={collectData} className='appButton'>Sign Up</button>
      <p>Already a user <Link to="/login"><span>Login</span></Link></p>
      <ToastContainer/>
    </div>
  )
}

export default SignUp;