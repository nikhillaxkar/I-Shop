import React, { useContext, useEffect, useState } from 'react'
import Container from '../../Components/Website/Container'
import { MainContext } from '../../Main'
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import { changeQty } from '../../reducers/cart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatcher=useDispatch();
  const {fetchProduct}=useContext(MainContext);
  const[Products,setProduct]=useState([]);
  const cart=useSelector(store=>store.cart);
  const user=useSelector(store=>store.user);
  const navigator=useNavigate();
  useEffect(
    ()=>{
      fetchProduct()
      .then(
        (success) => {
          if (success.status == 1) {
            setProduct(success.data);
          } else {
            setProduct([]);
          }
        }
      ).catch(
        (error) => {

        }
      )
    },
    []
  )

  const dbCartUpdate=(pId,qty)=>{
       if(user.data != null){
        axios.get(`http://localhost:5000/user/change-qty/${user.data._id}/${pId}/${qty}`)
       }
  }
const checkout=()=>{
   if(user.data==null){
    navigator("/login?ref=checkout");
   }else{
    navigator("/checkout");

   }
}
  const tbody=[];
  for(let p of Products){
    const found=cart.data.find(i=>i.pId == p._id);
    if(found){
      tbody.push(<tr class="bg-white border-b dark:bg-white-800 dark:border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
          {p.name}
      </th>
      <td class="px-6 py-4">
          {p.discounted_price}
      </td>
      <td class="px-6 py-4 flex items-center gap-4">
        <button onClick={()=>{
          dispatcher(changeQty({pId: p._id,flag: 2, price: p.discounted_price}))
           dbCartUpdate(p._id,found.qty-1)
          }} className='p-2 shadow bg-blue-400 text-white'>-</button>
          <div className='border p-3 w-[20%] text-center'>{found.qty}</div>
          <button onClick={()=>{
            dispatcher(changeQty({pId: p._id,flag: 1, price: p.discounted_price}))
            dbCartUpdate(p._id,found.qty+1)

            }} className='p-2 shadow bg-blue-400 text-white'>+</button>
      </td>
      <td class="px-6 py-4">
          {p.discounted_price*found.qty}
      </td>
  </tr>)
    }
  }
  return (
     <Container>
      <div className="relative overflow-x-auto my-5">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Product 
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Total
        </th>
      </tr>
    </thead>
    <tbody>
       {tbody}
    </tbody>
  </table>
  
</div>
<div className='text-right text-3xl' >
   Total: ${cart.total}
  </div>
  <button onClick={checkout} className='block mx-auto p-3 border border-blue-500'>Checkout</button>

      </Container>
  )
}

export default Cart
