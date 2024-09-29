import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Ordersummart = () => {
  const {order_id}=useParams();
  const[order,setOrder]=useState(null);
    
  useEffect(() => {
    axios.get(`http://localhost:5000/order-details/${order_id}`)
        .then(response => {
            if (response.data.status === 1) {
                setOrder(response.data.data);
            } else {
                console.error('Failed to fetch order details', response.data);
            }
        })
        .catch(error => {
            console.error('Error fetching order details:', error.response ? error.response.data : error.message);
        });
}, [order_id]);

  return (
    <div>
      
    </div>
  )
}

export default Ordersummart
