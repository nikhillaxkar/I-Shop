import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from '../../../Components/Admin/Card'
import BreadCrum from '../../../Components/Admin/BreadCrum'
import { MainContext } from '../../../Main';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
 const Edit = () => {
  const { apiBaseUrl,colorBaseUrl,notify,fetchColor,setLoaderToggle}=useContext(MainContext);
 const {c_id}=useParams();
 const [colorData,setColorData]=useState(null);
const navigate=useNavigate();


 useEffect(
  ()=>{
    if(c_id!=null){
      fetchColor(c_id)
      .then(
        (success)=>{
         if(success.status==1){
          setColorData(success.data);
      
         }}
      ).catch(
        (error)=>{
  
        }
      )
    }
  },
  [c_id]
 )
  
  const breadcurm = [
    {
      name: "Color",
      url: "/admin/category/view"
    },
    {
      name: "Edit",
      url: "/admin/color/add"
    },

  ]

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoaderToggle(true);
    const name = e.target.name.value;
    const color = e.target.color.value;
    if (name != "" && color != "" ) {
     
    axios.put(apiBaseUrl + colorBaseUrl+"/update/"+c_id,{name,color})
    .then(
      (success)=>{
           if(success.data.status==1){
            e.target.reset();
            notify(success.data.msg, success.data.status ? 'success' : 'error');
            if(success.data.status==1){
              navigate('/admin/color/view');
            }
           }
      }
    ).catch(
      (error)=>{
            notify("Clinet side error","error")
      }
    ).finally(
      ()=>{
        setLoaderToggle(false);
      }
    )
    }
    else{
      setLoaderToggle(false);

    }



  }
  

  return (
    <Card>
      <BreadCrum items={breadcurm} />

      <form encType='multipart/form-data' onSubmit={formSubmitHandler} className='mt-[20px]'>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Name
          </label>
          <input
            name='name'
            type="text"
            value={colorData?.name}
           onChange={
            (e)=>{
              setColorData(
                {
                  ...colorData,
                  name:e.target.value
                }
              )
            }
           }
            id="base-input"
          

            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Color
          </label>
          <input
            name='color'
            value={colorData?.color}
            type="color"
            onChange={
              (e)=>{
                setColorData(
                  {
                    ...colorData,
                    color:e.target.value
                  }
                )
              }
             }
            id="base-input"
            className="w-full border-none outline-none"
          
          />
        </div>
       
        <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Update</button>

      </form>
      <hr />
    </Card>
  )
}

export default Edit;
