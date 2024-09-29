import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from '../../../Components/Admin/Card'
import BreadCrum from '../../../Components/Admin/BreadCrum'
import { MainContext } from '../../../Main';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
 const Edit = () => {
  const { apiBaseUrl,categoryBaseUrl,notify,fetchCategoryById,setLoaderToggle}=useContext(MainContext);
 const {c_id}=useParams();
 const [categoryData,setCategoryData]=useState(null);
 const[categoryImgBase,setCategoryImgBase]=useState(null)
const navigate=useNavigate();


 useEffect(
  ()=>{
    if(c_id!=null){
      fetchCategoryById(c_id)
      .then(
        (success)=>{
         if(success.status==1){
          setCategoryData(success.data);
          setCategoryImgBase(success.imgBaseUrl)
      
         }}
      ).catch(
        (error)=>{
  
        }
      )
    }
  },
  [c_id]
 )
  const titleRef = useRef();
  const slugRef = useRef();
  const breadcurm = [
    {
      name: "Category",
      url: "/admin/category/view"
    },
    {
      name: "Edit",
      url: "/admin/category/add"
    },

  ]

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoaderToggle(true);
    const name = e.target.name.value;
    const slug = e.target.slug.value;
    const image = e.target.image.files[0];
    if (name != "" && slug != "" ) {
      const formData=new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("image", image);
      formData.append("old_image",categoryData.image);
    axios.put(apiBaseUrl + categoryBaseUrl+"/update/"+c_id,formData)
    .then(
      (success)=>{
           if(success.data.status==1){
            e.target.reset();
            notify(success.data.msg, success.data.status ? 'success' : 'error');
            if(success.data.status==1){
              navigate('/admin/category/view');
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
  const titleToSlug = (value) => {

    const slug = value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+$/g, '');
    return  slug;

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
            value={categoryData?.name}
            onChange={
              (e)=>{
                setCategoryData({
                  ...categoryData,
                  name:e.target.value,
                  slug:titleToSlug(e.target.value)
                })
              }
            }
            id="base-input"
          

            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={titleRef}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            slug
          </label>
          <input
            name='slug'
            value={categoryData?.slug}
            type="text"

            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ref={slugRef}
            readOnly
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Image
          </label>
          <input
            name='image'
            type="file"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <img src={apiBaseUrl+categoryImgBase+"/"+categoryData?.image} width={100} height={50} alt="" />
        </div>
        <button type="submit" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Update</button>

      </form>
      <hr />
    </Card>
  )
}

export default Edit;
