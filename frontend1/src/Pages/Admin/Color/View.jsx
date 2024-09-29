import React, { useContext, useEffect, useState } from 'react'
import Card from '../../../Components/Admin/Card'
import BreadCrum from '../../../Components/Admin/BreadCrum'
import { MainContext } from '../../../Main'
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios'; 
import { FaPencilAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
const View = () => {
  const {fetchColor,apiBaseUrl,colorBaseUrl,notify}=useContext(MainContext);
  const [colors,setColor]=useState([]);
  
  const getColor=()=>{

    fetchColor()
    .then(
      (success)=>{
       if(success.status ==1){
        setColor(success.data);
       }else{
        setColor([]);
       }
      }
    ).catch(
      (error)=>{

      }
    )
  }


  useEffect(
    getColor,
    []
  )


 const  updateStatus=(id,status)=>{
   axios.patch(apiBaseUrl+colorBaseUrl+"/change-status/"+id+"/"+status)
   .then(
    (success)=>{
      if(success.data.status ==1){
        notify(success.data.msg,"success");
        getColor();
        
      }else{
        notify(success.data.msg,"error");

      }
    }
  )
  .catch(
    (error)=>{
      notify("Client side error","error");

    }
  )
 }
  const breadcurm=[
    {
      name:"Category",
      url:"/admin/category/view"
    },
  ]

  const del=(catId)=>{
    axios.delete(apiBaseUrl +colorBaseUrl+"/delete/" + catId)
    .then(
      (success)=>{
        if(success.data.status ==1){
          notify(success.data.msg,"success");
          getColor();
        }else{
          notify(success.data.msg,"error");

        }
      }
    )
    .catch(
      (error)=>{
        notify("Client side error","error");

      }
    )
  }
  const breadcrum=[
    {
      name:"Color",
      url:"/admin/color/view"
    }
  ]
  return (
    <Card>
   <BreadCrum items={breadcurm}/>
     <hr />
     <div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <th scope="col" className="px-6 py-3">
          SR
        </th>
        <th scope="col" className="px-6 py-3">
          NAME
        </th>
        <th scope="col" className="px-6 py-3">
          SLUG
        </th>
 
        <th scope="col" className="px-6 py-3">
          COLOR
        </th>
        <th scope="col" className="px-6 py-3">
          ACTION
        </th>
      </tr>
    </thead>
    <tbody>
      {
        colors.map(
          (color,index)=>{
            return(
              <tr key={color._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index+1}
              </th>
              <td  className="px-6 py-4 ">
                {color.name}
              </td>
              <td className="px-6 py-4">
                <div className='p-4' style={{background:color.color}}></div>
              </td>
              
              <td className="px-6 py-4 "> 
                {
                 color.status
                 ?
                 <button onClick={()=>updateStatus(color._id,false)} title='Click to inactive' className='p-3 bg-green-400 text-white'>
                  Active
                 </button>
                 : <button onClick={()=>updateStatus(color._id,true)} title='Click to active' className='p-3 bg-orange-400 text-white'>
                 Inactive
                </button>
                }
              </td>

              <td className="px-6 py-4 flex gap-3 items-center">
                <MdDeleteOutline onClick={()=>del(color._id)} 
                  className='text-2xl cursor-pointer text-red-500'/>
                
                  <Link to={"/admin/color/edit/"+color._id}>
                  <FaPencilAlt className=' cursor-pointer text-blue-500' />
                  </Link>
                 
              </td>
            </tr>
            )
          }
        )
      }
     
    
     
    </tbody>
  </table>
</div>

    </Card>
  )
}

export default View
