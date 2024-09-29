import React, { useContext, useEffect, useRef, useState } from 'react';
import BreadCrum from '../../../Components/Admin/BreadCrum';
import Card from '../../../Components/Admin/Card';
import { MainContext } from '../../../Main';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import axios from 'axios'; 


const Add = () => {
  const {productBaseUrl, apiBaseUrl, fetchCategory, fetchColor, colorBaseUrl, notify } = useContext(MainContext);
  const [category, setCategory] = useState([]);
  const [colors, setColor] = useState([]);
  const [productCat, setProductCat] = useState(null);
  const [productColor, setProductColor] = useState([]);
  const animatedComponents = makeAnimated();
  
  
  const slugRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const discountRef = useRef();
  const percentRef = useRef();

  useEffect(
    () => {
      fetchCategory()
        .then(
          (success) => {
            setCategory(success.data);
          }
        ).catch(
          (error) => {
            setCategory([]);
          }
        )

      fetchColor()
        .then(
          (success) => {
            setColor(success.data);
          }
        ).catch(
          (error) => {
            setColor([]);
          }
        )
    }
  )

  const breadcurm = [
    {
      name: 'Product',
      url: '/admin/product/view',
    },
    {
      name: 'Add',
      url: '/admin/product/add',
    },
  ];

  const formSubmitHandler = (e) => {
    // Handle form submission here
    e.preventDefault();
    const name = e.target.name.value;
    const slug = e.target.slug.value;
    const price = e.target.price.value;
    // const discount_percent = e.target.discount_percent.value;
    const discount_price = e.target.discount_price.value;
    const image = e.target.image.files[0];

    if (name != "" && slug != "" && price != "" && discount_price != "" && image != undefined && productCat != null && productColor.length != 0) {
         const formData=new FormData();
         formData.append("name",name);
         formData.append("slug",slug);
         formData.append("price",price);
         formData.append("discounted_price",discount_price);
         formData.append("category",productCat.value);
         const cArr=productColor.map(c=>c.value);
         formData.append("color", JSON.stringify(cArr));
         formData.append("image",image);
         console.log("apiteset",apiBaseUrl + productBaseUrl+"/create",formData)
         axios.post(apiBaseUrl + productBaseUrl+"/create",formData)
         .then(
          (success)=>{
            notify(success.data.msg, success.data.status ? 'success' : 'error');

               if(success.data.status==1){
                e.target.reset();
                setProductCat(null);
                setProductColor(null);
               }
          }).catch(
          (error)=>{
                notify("Clinet side error","error")
          }
        )
        

      
    }
    else {

    }
  };

  const titleToSlug = (event) => {
    const slug = event.target.value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+$/g, '');
    slugRef.current.value = slug;
  };

  const calDiscount = () => {
    if (priceRef.current.value != "" && percentRef.current.value != "") {
      const dis =parseInt ((priceRef.current.value * percentRef.current.value) / 100);
      discountRef.current.value = priceRef.current.value - dis;
      console.log(dis)
    }
  }
  const catSelHandler = (selectedOption) => {
    setProductCat(selectedOption);
  }

  const colorSelHandler = (options) => {
    // const ids=options.map(o=>o.value)
    setProductColor(options);
  }
  return (
    <Card>
      <BreadCrum items={breadcurm} />

      <form
        encType="multipart/form-data"
        onSubmit={formSubmitHandler}
        className="mt-[20px]"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Name
            </label>
            <input
              onChange={titleToSlug}
              ref={titleRef}
              name="name"
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
              Slug
            </label>
            <input
              readOnly
              ref={slugRef}
              name="slug"
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Price
            </label>
            <input
              ref={priceRef}
              onChange={calDiscount}

              name="price"
              type="number"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Discount Percent %
            </label>
            <input
              max={99}
              ref={percentRef}
              name="discount_percent"
              type="number"
              onChange={calDiscount}
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Discount Price
            </label>
            <input
              readOnly
              ref={discountRef}
              name="discount_price"
              type="number"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Category
            </label>
            <Select
            value={productCat}
              onChange={catSelHandler}
              closeMenuOnSelect={false}
              components={animatedComponents}

              options={
                category.map(
                  (cat) => {
                    return { value: cat._id, label: cat.name }
                  }
                )
              }
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Color
            </label>
            <Select
            value={productColor}
              onChange={colorSelHandler}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={
                colors.map(
                  (color) => {
                    return { value: color._id, label: color.name }
                  }
                )
              }
            />
           
          </div>



        </div>


        <div className='my-3'>
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Image
          </label>
          <input name="image" type="file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            data-height="100" />        </div>
        <button
          type="submit"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Save
        </button>




      </form>
      <hr />
    </Card>
  );
};

export default Add;
