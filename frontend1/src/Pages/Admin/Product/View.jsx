import React, { useContext, useEffect, useState } from 'react'
import Card from '../../../Components/Admin/Card'
import BreadCrum from '../../../Components/Admin/BreadCrum'
import { MainContext } from '../../../Main'
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios'; 
import { FaPencilAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaCirclePlus } from "react-icons/fa6";

const View = () => {
  const {fetchProduct,apiBaseUrl,categoryBaseUrl,notify}=useContext(MainContext);
  const [product,setProduct]=useState([]);
  const[imgBaseUrl,setImgUrl]=useState("");
  
  const getProduct=()=>{

    fetchProduct()
    .then(
      (success)=>{
       if(success.status ==1){
        setProduct(success.data);
        setImgUrl(success.imgBaseUrl);
       }else{
        setProduct([]);
       }
      }
    ).catch(
      (error)=>{

      }
    )
  }


  useEffect(
    getProduct,
    []
  )


 const  updateStatus=(id,status)=>{
   axios.patch(apiBaseUrl+categoryBaseUrl+"/change-status/"+id+"/"+status)
   .then(
    (success)=>{
      if(success.data.status ==1){
        notify(success.data.msg,"success");
        getProduct();
        
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
      name:"Product",
      url:"/admin/product/view"
    },
  ]

  const delCat=(catId,imageName)=>{
    axios.delete(apiBaseUrl +categoryBaseUrl+"/delete/" + catId + "/" + imageName)
    .then(
      (success)=>{
        if(success.data.status ==1){
          notify(success.data.msg,"success");
          getProduct();
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
  // const breadcrum=[
  //   {
  //     name:"Category",
  //     url:"/admin/category/view"
  //   }
  // ]
  return (
    <Card>
      <Link to={"/admin/product/add"}>
      <FaCirclePlus className='ml-auto my-2 text-4xl' />

      </Link>

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
          IMAGE
        </th>
        <th scope="col" className="px-6 py-3">
          Category Name
        </th>
        <th scope="col" className="px-6 py-3">
          Colors
        </th>
        <th scope="col" className="px-6 py-3">
          STATUS
        </th>
        <th scope="col" className="px-6 py-3">
          ACTION
        </th>
      </tr>
    </thead>
    <tbody>
      
      {
        product.map(
          (prod,index)=>{
            // console.log("product",prod.slug)

            return(
              <tr key={prod._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index+1}
              </th>
              <td  className="px-6 py-4 ">
                {prod.name}
              </td>
              <td className="px-6 py-4">{prod.slug}</td>
              <td className="px-6 py-4">
                <img width={50}src={apiBaseUrl+ imgBaseUrl+prod.image} alt="" />
              </td>
              <td className="px-6 py-4">
                {prod.category?.name}
              </td>
              
              <td className="px-6 py-4">
           
                <ul style={{listStyle:"circle"}}>
                 {prod.color.map(
                  (c)=>{
                    return <li style={{listStyle:"inherit"}}>{c.name}</li>
                  }
                 )}
                 </ul>
              </td>
              <td className="px-6 py-4 "> 
                {
                 prod.status
                 ?
                 <button onClick={()=>updateStatus(prod._id,false)} title='Click to inactive' className='p-3 bg-green-400 text-white'>
                  Active
                 </button>
                 : <button onClick={()=>updateStatus(prod._id,true)} title='Click to active' className='p-3 bg-orange-400 text-white'>
                 Inactive
                </button>
                }
              </td>

              <td className="px-6 py-4 flex gap-3 items-center">
                <MdDeleteOutline onClick={()=>delCat(prod._id,prod.image)} 
                  className='text-2xl cursor-pointer text-red-500'/>
                
                  <Link to={"/admin/category/edit/"+prod._id}>
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
