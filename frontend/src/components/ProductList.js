import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {

    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts= async()=>{
        let result = await fetch('http://127.0.0.1:5000/products',{
          headers:{
            authorization: JSON.parse(localStorage.getItem('token'))
          }
        });
        result = await result.json();
        setProducts(result);
    }

    // console.log(products);

    const deleteItem= async(id)=>{
        let result= await fetch(`http://127.0.0.1:5000/product/${id}`,{
            method:'delete'
        });

        result = await result.json();

        if(result){
            toast.success("Item Deleted",{
              position: "top-right",
              autoClose : 2000,
              hideProgressBar : false,
              progress : undefined
            });
            getProducts();
        }
    }

    const searchProduct = async (event)=>{
      let key = event.target.value;
      if(key){
        let result = await fetch(`http://127.0.0.1:5000/search/${key}`);
        result = await result.json();
        if(result){
          setProducts(result);
        }
      }
      else{
        getProducts();
      }
    }

  return (
    <div className='product'>
      <h1>Product List</h1>
      <input type="text" className='search-box' onChange={searchProduct} placeholder='Search Product' />
      <ul className='product-list-table'>
        <li>S No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Brand</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length===0?<h2>No Product Found</h2> : products.map((item,index)=>
        <ul className='product-list-map' key={item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>{item.price} Rs.</li>
        <li>{item.brand}</li>
        <li>{item.category}</li>
        <li>
            <i onClick={()=>deleteItem(item._id)} className="material-icons" style={{fontSize:"15px",cursor:"pointer",marginRight:"10px"}}>delete</i>
            <Link to={"/update/"+item._id}><i className="fa fa-edit" style={{fontSize:"18px"}}></i></Link>
        </li>
        </ul>
      )}
      <ToastContainer/>
    </div>
  )
}

export default ProductList
