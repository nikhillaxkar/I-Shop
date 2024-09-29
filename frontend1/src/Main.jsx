import React, { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MainContext = createContext(); // Export MainContext

const Main = (props) => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const categoryBaseUrl = process.env.REACT_APP_API_CATEGORY_URL;
  const colorBaseUrl = process.env.REACT_APP_API_COLOR_URL;
  const productBaseUrl=process.env.REACT_APP_API_PRODUCT_URL
   

  const [loaderToggle,setLoaderToggle]=useState(false);
  const notify = (msg,flag) => toast(msg,{type:flag});
  
  const fetchProduct = async (limit = 0, category = undefined, color = undefined) => {
    const urlQuery = new URLSearchParams();
    if (limit) urlQuery.append('limit', limit);
    if (category) urlQuery.append('category', category);
    if (color) urlQuery.append('color', color);
    
    const response = await fetch(`${apiBaseUrl}${productBaseUrl}?${urlQuery.toString()}`);
    const data = await response.json();
    return data;
  };
  const fetchCategory=async ()=>{
    const response=await fetch (apiBaseUrl + categoryBaseUrl);
    const data=await response.json();
    return data;
  }
  
  const fetchColor=async (id=null)=>{
    let api=apiBaseUrl + colorBaseUrl;
    if(id!==null){
      api=apiBaseUrl + colorBaseUrl + "/"+id;

    }
    
      const response=await fetch (api);

      const data=await response.json();
      return data;
    
   
  }

  const fetchCategoryById=async (id)=>{
    const response=await fetch (apiBaseUrl + categoryBaseUrl + "/"+id);
    
    const data=await response.json();
    return data;
  }
  return (
    <MainContext.Provider value={{fetchProduct,fetchColor,setLoaderToggle, apiBaseUrl, categoryBaseUrl,colorBaseUrl ,notify,fetchCategory,fetchCategoryById,productBaseUrl}}>
        <ToastContainer />
        <div className='loader' style={{
          display:loaderToggle ? 'flex' : 'none'
        }}>
          <h1>Loading.....</h1>
        </div>
      {props.children}
    </MainContext.Provider>
  );
};

export default Main;
