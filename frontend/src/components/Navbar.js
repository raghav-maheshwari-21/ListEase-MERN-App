import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const auth = localStorage.getItem("users");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }


  return (
    <div>

      {auth ?
        <ul className='nav-ul'>
          <li><Link to="/">Products</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          {/* <li><Link to="/update">Update Product</Link></li> */}
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login" onClick={logout}>Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
        :
        <ul className='nav-ul-right'>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
      }

      {/* <ul className='nav-ul'>
        <li><Link to="/">Products</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        {/* <li><Link to="/login">Login</Link></li>
        <li>{auth?<Link to="/signup" onClick={logout}>Logout</Link>
        :<Link to="/signup">Sign up</Link>}</li> */}

        {/* {auth ? <li><Link to="/signup" onClick={logout}>Logout</Link></li>
          : <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
          </>
        }
      </ul> */} 
    </div>
  )
}

export default Navbar;
