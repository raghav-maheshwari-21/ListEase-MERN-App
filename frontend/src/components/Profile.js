import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    const auth = localStorage.getItem("users");
    let name1 = JSON.parse(auth).name;
    let name2 = name1[0].toUpperCase() + name1.substring(1);

  return (
    <div className='profile-section'>
      <h1>Profile</h1>
      <h3>Name : {name2}</h3>
      <h3>Email : {JSON.parse(auth).email}</h3>
    </div>
  )
}

export default Profile
