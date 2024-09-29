import React from 'react';
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { addToCart } from '../../reducers/cart';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios'; 
const ProductBox = (props) => {
  const dispathcher=useDispatch();
  const user=useSelector(store=>store.user);
  const addToDBCart =(product_id)=>{
      if(user.data !=null){
        axios.post("http://localhost:5000/user/add-to-cart",{product_id,user_id:user.data._id})
        .then(
          (success)=>{

          }
        ).catch(
          (error)=>{

          }
        )
      }
  }
  return (
    <div className={`flex ${props.grid ? 'flex-col' : 'flex-row'} gap-5 p-4 text-center border-[3px] pb-3 rounded-[4px] border-[#F6F7F8]`}>
      {/* Hot Tag */}
      <div className={`bg-[#FF4858] w-[40px] rounded-[2px] py-1 text-white ${props.hot ? 'opacity-1' : 'opacity-0'}`}>
        Hot
      </div>

      {/* Product Image */}
      <img
        className={`h-[200px] ${props.grid == false ? 'w-[30%]' : ''} block mx-auto`}
        src={`http://localhost:5000/images/product/${props.image}`}
        alt=""
      />
      {
        props.grid==false ?
          <div className='w-[70%] shrink-0 mt-[40px] flex flex-col gap-3 items-start'>
            {/* Product Name */}
            <div>{props.name}</div>

            {/* Star Rating */}
            <div className='flex justify-center gap-3'>
              <Stars yellow={4} />
            </div>

            {/* Icons for Cart and Wishlist */}
            <div className={`flex 4${props.grid ? 'mx-auto' : ''} gap-4 text-xl`}>
              <FaShoppingCart  className='cursor-pointer' />
              <FaHeart className='cursor-pointer' />
            </div>

            {/* Price */}
            <div className='flex justify-center gap-2'>
              <span className='text-[#FF4858] font-semibold'>${props.discounted_price}</span>
              <span className='text-[#C1C8CE] line-through'>${props.price}</span>
            </div>
          </div>
          :
          <>
            {/* Product Name */}
            <div>{props.name}</div>

            {/* Star Rating */}
            <div className='flex justify-center gap-3'>
              <Stars yellow={4} />
            </div>

            {/* Icons for Cart and Wishlist */}
            <div className='flex mx-auto gap-4 text-xl'>
              <FaShoppingCart  onClick={()=>{
                dispathcher(addToCart({pId: props._id, price: props.discounted_price} ))
                addToDBCart(props._id)
            }} className='cursor-pointer' />
              <FaHeart className='cursor-pointer' />
            </div>

            {/* Price */}
            <div className='flex justify-center gap-2'>
              <span className='text-[#FF4858] font-semibold'>${props.discounted_price}</span>
              <span className='text-[#C1C8CE] line-through'>${props.price}</span>
            </div>
          </>
      }
    </div>
  );
}

export default ProductBox;

// Star Component
function Stars({ yellow }) {
  const yellowStars = [];
  const whiteStars = [];

  // Limit yellow stars to 5 maximum
  for (let i = 1; i <= Math.min(5, yellow); i++) {
    yellowStars.push(<FaStar className='text-[#FFC600]' key={`yellow-${i}`} />);
  }

  // Fill the remaining stars as white stars
  for (let i = 1; i <= (5 - yellow); i++) {
    whiteStars.push(<CiStar className='text-gray-400' key={`white-${i}`} />);
  }

  return (
    <div className="flex">
      {yellowStars}
      {whiteStars}
    </div>
  );
}
