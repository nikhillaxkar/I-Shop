import React, { useContext, useEffect, useState } from 'react'
import Container from '../../Components/Website/Container'
import { MainContext } from '../../Main';
import { useDispatch, useSelector } from 'react-redux';
import { changeQty, emptyCart } from '../../reducers/cart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useRazorpay from "react-razorpay";

const Checkout = () => {
    const {fetchProduct,notify}=useContext(MainContext);
    const[Products,setProduct]=useState([]);
    const cart=useSelector(store=>store.cart);
    const user=useSelector(store=>store.user);
    const dispatcher=useDispatch();
    const [userData,setUserData]=useState(null);
    const navigator=useNavigate();
    const [Razorpay] = useRazorpay();

    useEffect(
        ()=>{
            setUserData({
                name:user.data?.name,
                email:user.data?.email,
                contact:user.data?.contact,
                address:user.data?.address,
                pincode:user.data?.pincode,
                paymentMode:2
            })
        },[user]
    )
     
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
     
const handleSubmit = (e) => {
    e.preventDefault()
    const order_total=cart.total + (userData.paymentMode == 1 ? 50 : 0)
    const product_details=[];
    for(let p of Products){
      const found=cart.data.find(i=>i.pId == p._id);
      if(found){
          product_details.push(
            {
              price:p.discounted_price,
              name:p.name,
              slug:p.slug,
              image:p.image,
              ...found
            }
          )
      }}
      const data={
        user_details:userData,
        product_details,
        order_total,
        user_id:user.data._id
      }
      axios.post(`http://localhost:5000/order/create-order`,data)
      .then(
        (success)=>{
          console.log(success.data.status);
          if(success.data.status == 1){
            if(userData.paymentMode == 1){
              navigator(`/order-summary/${success.data.order_id}`)
              dispatcher(emptyCart())
            }else{
                 openPaymentPopUp(success.data.order_id,success.data.razorpayOrder);
            }
          }else{

          }
        }
      ).catch(
        (error)=>{

        }
      )
    
  }

  const openPaymentPopUp=(order_id,razorpayOrder)=>{
    const options = {
      key: "rzp_test_uL2zwO9D0uEUoK", // Enter the Key ID generated from the Dashboard
      amount: razorpayOrder.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Nikhil",
      description: "upskillingBharat",
      image: "",
      order_id: razorpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        axios.post(`http://localhost:5000/order/razorpay-transaction-handle`,{amount:razorpayOrder.amount,razorpay_response: response,order_id})
        .then(
          (success)=>{
                  if(success.data.status){
                    navigator(`/order-summary/${success.data.order_id}`)
              dispatcher(emptyCart())
                  }else{
                    notify(success.data.msg,"error")
                  }
          }
         ).catch(
          (error)=>{
              notify("Client error h","error")
          }
         )

      },
      prefill: {
        name: userData.name,
        email: userData.email,
        contact: userData.contact,
      },
      
      theme: {
        color: "#ff4252",
      },
    };
  
    const rzp1 = new Razorpay(options);
  
    rzp1.on("payment.failed", function (response) {
      axios.post(`http://localhost:5000/order/razorpay-transaction-handle`,{amount:razorpayOrder.amount,razorpay_response: response.error.metadata,order_id})
      .then(
        (success)=>{
               
                  notify(success.data.msg,"error");
                  navigator(`/order-summary/${success.data.order_id}`)
                
        }
       ).catch(
        (error)=>{
            notify("Client error h","error")
        }
       )
      // alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
  
    rzp1.open();
  }


    const tbody=[];
  for(let p of Products){
    const found=cart.data.find(i=>i.pId == p._id);
    if(found){
      tbody.push(<tr key={p._id} class="bg-white border-b dark:bg-white-800 dark:border-gray-700">
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
    <div className='lg:grid grid-cols-2 gap-2 my-4'>
        <div className=''>
            <h3 className='text-center my-3 text-xl'>Cart Details</h3>
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
        <div className='border-l'>
        <h3 className='text-center my-3 text-xl'>Shipping Details</h3>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 p-4">

        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={userData?.name}
            onChange={(e)=>{setUserData({...userData,name:e.target.value})}}
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={userData?.email}
            onChange={(e)=>{setUserData({...userData,email:e.target.value})}}

            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Contact */}
        <div className="mb-4">
          <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">
            Contact
          </label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={userData?.contact}
            onChange={(e)=>{setUserData({...userData,contact:e.target.value})}}

            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your contact number"
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={userData?.address}
            onChange={(e)=>{setUserData({...userData,address:e.target.value})}}

            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your address"
            rows="3"
            required
          ></textarea>
        </div>

        {/* Pincode */}
        <div className="mb-4">
          <label htmlFor="pincode" className="block text-gray-700 text-sm font-bold mb-2">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={userData?.pincode}

            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your pincode"
            required
          />
        </div>

        <div>
        <label htmlFor="payment_mode" className="block text-gray-700 text-sm font-bold mb-2">
            Payment Mode
          </label>
        <input type="radio"  onClick={
          ()=>setUserData({...userData,paymentMode: 1})}
             checked={userData?.paymentMode == 1 ? true : false} value={1}
             />  COD ($ 50 extra)<br />

          <input type="radio"  onClick={
          ()=>setUserData({...userData,paymentMode: 2})}
             checked={userData?.paymentMode == 2 ? true :false} value={2} 
             /> Razorpay (No extra charge) <br/>


        </div>
         <div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Proceed
        </button>
        </div>
      </form>
        </div>

    </div>
    </Container>
  )
}

export default Checkout
