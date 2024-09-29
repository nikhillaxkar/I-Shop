import React, { useContext, useRef } from 'react'
import Card from '../../../Components/Admin/Card'
import BreadCrum from '../../../Components/Admin/BreadCrum'
import { MainContext } from '../../../Main';
import axios from 'axios'; 
 const Add = () => {
  const { apiBaseUrl,colorBaseUrl,notify}=useContext(MainContext);
  const titleRef = useRef();
  const slugRef = useRef();
  const breadcurm = [
    {
      name: "Color",
      url: "/admin/color/view"
    },
    {
      name: "Add",
      url: "/admin/color/add"
    },

  ]

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const color = e.target.color.value;
    if (name != "" && color != "" ) {
    axios.post(apiBaseUrl + colorBaseUrl+"/create",{name,color})
    .then(
      (success)=>{
           if(success.data.status==1){
            e.target.reset();
            notify(success.data.msg, success.data.status ? 'success' : 'error');
           }
      }
    ).catch(
      (error)=>{
            notify("Clinet side error","error")
      }
    )
    }
    else{

    }



  }
  const titleToSlug = () => {

    const slug = titleRef.current.value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+$/g, '');
    slugRef.current.value = slug;

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
            type="color"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
          />
        </div>
        
        <button type="submit" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Save</button>

      </form>
      <hr />
    </Card>
  )
}

export default Add
