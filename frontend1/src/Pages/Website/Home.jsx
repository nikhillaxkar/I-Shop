import React, { useContext, useEffect, useState } from "react";
import Container from "../../Components/Website/Container";
import ProductBox from "../../Components/Website/ProductBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MainContext } from '../../Main'

const Home = () => {
  const[category,setCategory]=useState([]);
  const[product,setProduct]=useState([]);
  const {fetchCategory,fetchProduct}=useContext(MainContext);

  const getData=()=>{

    fetchCategory()
    .then(
      (success)=>{
       if(success.status ==1){
        setCategory(success.data);
       }else{
        setCategory([]);
       }
      }
    ).catch(
      (error)=>{

      }
    )

    fetchProduct()
    .then(
      (success)=>{
       if(success.status ==1){
        setProduct(success.data);
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
    getData,
    []
  )
  return (
    <>
      <div className="w-full h-[450px] md:h-[650px] relative banner-bg">
        <img
          src="images/corousel.png"
          className="absolute md:h-[auto] h-[100%] bottom-0 sm:right-[30%]"
          alt=""
        />
      </div>
      <BestSeller category={category} product={product} />
      <Container>
      <ProductSlider/>
      </Container>
    </>
  );
};

export default Home;

function BestSeller({category,product}) {
 const [filterCat,setFilterCat]=useState(null);
  if(filterCat !=null){
    product=product.filter(
      (prod)=>{
        return prod.category._id==filterCat;
      }
    )
  }
  
  return (
    <Container>
      <div className="text-center text-[30px] font-bold uppercase my-5">
        Best Seller
      </div>
      <ul className=" hidden md:flex justify-center gap-[20px]">
        <li className="cursor-pointer" onClick={()=>setFilterCat(null)}>All</li>
        {category.map((item, index) => (
          <li className="cursor-pointer" onClick={()=>setFilterCat(item._id)} key={index}>{item.name}</li> // Add key prop here
        ))}
      </ul>
      <div className="md:hidden px-2">
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e)=>setFilterCat(e.target.value == "" ? null : e.target.value)}
       >
          <option selected="" value=""  >All</option>
          {category.map((item, index) => (
            <option value={item._id} key={index}>{item.name}</option> // Add key prop here
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 my-4 justify-center">
        {product.map((product, index) => {
          return <ProductBox grid={true} {...product} key={index} />;
        })}
      </div>
      
    </Container>
  );
}
const ProductSlider=()=>{
  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  const data=[
    {
      img:"beats_solo_2.png",
      title:"Beats Solo 2 On Ear Headphones - Black"
    },
    {
      img:"H-squared.png",
      title:"H-squared tvTray"
    },
    {
      img:"Netatmo_rain.png",
      title:"Netatmo Rain Gauge"
    } ,{
      img:"H-squared.png",
      title:"H-squared tvTray"
    },
  ]
return(
  <div>
  <h3 className="text-center text-3xl font-bold my-3 py-3">FEATURED PRODUCTS</h3>
  <Slider {...settings}>
    {
      data.map(
        (d,i)=>{
          return(
            <div className="p-3">
            <div className="shadow h-[150px] ">
            <img src={"images/" + d.img} alt="" />
            <div>{d.title}</div>
          </div>
          </div>
          )
        }
      )
    }

  
</Slider>
</div>
)
}