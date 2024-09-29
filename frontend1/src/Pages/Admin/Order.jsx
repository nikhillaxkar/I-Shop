import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'; 
import Card from '../../Components/Admin/Card'
import BreadCrum from '../../Components/Admin/BreadCrum'
import { MainContext } from '../../Main'


const Order = () => {
  const[orders,setOrder]=useState([]);
  const StartDateRef=useRef();
  const endDateRef=useRef();

  const breadcurm=[
    {
      name:"Order",
      url:"/admin/order"
    },
  ]

  const dateFilterHandler=()=>{
         const query=new URLSearchParams({start: StartDateRef.current.value,
          end: endDateRef.current.value});
          console.log('http://localhost:5000/order/get-data?' + query.toString())
          axios.get('http://localhost:5000/order/get-data?' + query.toString())
          .then(
            (success)=>{
              if(success.data.status){
                setOrder(success.data.order_data)
              }
            }
          ).catch(
            ()=>{
    
            }
          )
  }

  useEffect(
    ()=>{
      axios.get('http://localhost:5000/order/get-data')
      .then(
        (success)=>{
          if(success.data.status){
            setOrder(success.data.order_data)
          }
        }
      ).catch(
        ()=>{

        }
      )
    },[]
  )
  return (
    
        <Card>
    <div className='my-4 px-2 flex gap-4 items-center'>
      <label htmlFor="">From</label>
      <input ref={StartDateRef} type="date" className='border p-2' />
      <label htmlFor="">To</label>
      <input ref={endDateRef} type="date" className='border p-2' />
      <button onClick={dateFilterHandler} className='p-2 border hover:bg-blue-400 hover:text-white'>Filter</button>
    </div>

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
          Product Details
        </th>
        <th scope="col" className="px-6 py-3">
        Shipping Details
        </th>
        <th scope="col" className="px-6 py-3">
          Order Status
        </th>
        <th scope="col" className="px-6 py-3">
          Order Date
        </th>
        
      </tr>
    </thead>
    <tbody>
      
      {
        orders.map(
          (order,index)=>{
            // console.log("product",prod.slug)

            return(
               <TableRow order={order}  index={index} key={index}/>
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

const TableRow=({order,index})=>{

  const[order_status,setOrderStatus]=useState(order.order_status);
  const changeOrderStatus=(new_status)=>{
    setOrderStatus(new_status);
  }
  // let status="";

  // switch(order.order_status){
  //    case 1:
  //     status="Payment pending";
  //     break;
  //     case 2:
  //     status="Payment done";
  //     break;
  //     case 3:
  //     status="Shipped";
  //     break;
  //     case 4:
  //     status="Delivered";
  //     break;
  //     case 5:
  //     status="Cancelled";
  //     break;
  //     case 6:
  //     status="Return";
  //     break;
  //     case 7:
  //     status="Refund";
  //     break;
  //     default:
  //       status="";
  //       break;
  // }

  return(
    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td  className="px-6 py-4">
         {index+1}
    </td>
    <td  className="px-6 py-4">
         {
          order.product_details.map(
            (product,i)=>{
              return(
                <div key={i} className='my-3'>
                  <div>
                    <b>{i+1}. </b>
                    Name: {product.name}
                  </div>
                  <div>Price: {product.price}</div>
                  <div>Qty: {product.qty}</div>
                </div>
              )
            }
          )
         }
         <hr className='m-2' />
         <b>Total</b> ${order.order_total}
    </td>
    

    <td  className="px-6 py-4">
    <div>Name: {order.shipping_details.name}</div>
    <div>Email: {order.shipping_details.email}</div>
    <div>Contact: {order.shipping_details.contact}</div>
    <div>Address: {order.shipping_details.address}</div>
    <div>Pincode: {order.shipping_details.pincode}</div>

    </td>
    <td  className="p-2 ">
      <select  onChange={(e)=>{changeOrderStatus(e.target.value)}} value={order_status} name="" id="">
        <option value="1">Payment pending</option>
        <option value="2">Payment Done</option>
        <option value="3">Shipped</option>
        <option value="4">Delivered</option>
        <option value="5">Cancelled</option>
        <option value="6">Return</option>
        <option value="7">Refund</option>

      </select>
    </td>
      <td>
        {new Date(order.createdAt).toLocaleDateString()}
        <br />
        {new Date(order.createdAt).toLocaleTimeString()}
        <hr className='my-3'/>
        {new Date(order.createdAt).toLocaleDateString()}
        <br />
        {new Date(order.createdAt).toLocaleTimeString()}
      </td>
  </tr>
  )
}

export default Order
