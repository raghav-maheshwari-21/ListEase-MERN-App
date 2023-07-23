import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState();
    const [brand,setBrand] = useState("");
    const [category,setCategory] = useState("");
    // const [id,setId] = useState("");

    const [error,setError] = useState(false);

    const navigate = useNavigate();

    const addProduct = async ()=>{

        if(!name || !price || !brand || !category){
          setError(true);
          return false;
        }

        console.log(name,price,brand,category);

        const userId = JSON.parse(localStorage.getItem('users'))._id;

        let result= await fetch('http://127.0.0.1:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,brand,category,userId}),
            headers:{
                'Content-Type':'application/json',
                headers:{
                  authorization : JSON.parse(localStorage.getItem('token'))
                }
            }
        })

        result = await result.json();
        console.log(result);

        if(result.name){
            localStorage.setItem("addedProduct",JSON.stringify(result));
            navigate('/');
        }
    }

  return (
    <div className='add-product'>
      <h1>Add Product</h1>
      <input type="text" className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name of product'/>
      {error && !name && <span className='invalid-input'>Enter valid name</span>}

      <input type="number" className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Price of product'/>
      {error && !price && <span className='invalid-input'>Enter valid price</span>}

      <input type="text" className='inputBox' value={brand} onChange={(e)=>{setBrand(e.target.value)}} placeholder='Brand of product'/>
      {error && !brand && <span className='invalid-input'>Enter valid brand</span>}

      <input type="text" className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='Category of product'/>
      {error && !category && <span className='invalid-input'>Enter valid category</span>}

      {/* <input type="text" className='inputBox' value={id} onChange={(e)=>{setId(e.target.value)}} placeholder='Id of user' /> */}
      <button type='button' onClick={addProduct} className='appButton'>Add Product</button>

      <ToastContainer/>
    </div>
  )
}

export default AddProduct;
