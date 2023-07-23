import React,{useEffect, useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name,setName] = useState("");
    const [price,setPrice] = useState();
    const [brand,setBrand] = useState("");
    const [category,setCategory] = useState("");
    
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails = async ()=>{
        console.log(params);
        let result = await fetch(`http://127.0.0.1:5000/update/${params.id}`);
        result=await result.json();
        
        setName(result.name);
        setPrice(result.price);
        setBrand(result.brand);
        setCategory(result.category);
    }

    const update = async()=>{
        console.log(name,price,brand,category);

        let result = await fetch(`http://127.0.0.1:5000/update/${params.id}`,{
            method: 'put',
            body : JSON.stringify({name,price,brand,category}),
            headers : {
                'Content-Type':"application/json"
            }
        });

        result = await result.json();
        console.log(result);
        navigate('/');
    }

  return (
    <div className='add-product'>
      <h1>Update Product</h1>
      <input type="text" className='inputBox' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Name of product'/>
      <input type="number" className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='Price of product'/>
      <input type="text" className='inputBox' value={brand} onChange={(e)=>{setBrand(e.target.value)}} placeholder='Brand of product'/>
      <input type="text" className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='Category of product'/>
      <button type='button' onClick={update} className='appButton'>Update</button>
    </div>
  )
}

export default UpdateProduct;
