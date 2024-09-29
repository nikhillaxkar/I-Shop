const express = require("express");
const OrderController = require("../controller/order");
const OrderRounter = express.Router()

OrderRounter.post(
    "/create-order",
    (req,res)=>{
        const result=new OrderController().create(req.body);
        result
  .then((success) => {
    res.send(success);
  })
  .catch((error) => {
    res.send(error);
  });   
    }
)

OrderRounter.get(
    "/order-details/:order_id",
    (req,res)=>{
        const result=new OrderController().orderDetails(req.params.order_id);
        result
  .then((success) => {
    res.send(success);
  })
  .catch((error) => {
    res.send(error);
  });   
    }
)

OrderRounter.post(
  "/razorpay-transaction-handle",
  (req,res)=>{
      const result=new OrderController().handlerTransaction(req.body);
      result
.then((success) => {
  res.send(success);
})
.catch((error) => {
  res.send(error);
});   
  }
)

OrderRounter.get(
  "/transaction/:id?",
  (req,res)=>{
      const result=new OrderController().readTransaction(req.params.id);
      result
.then((success) => {
  res.send(success);
})
.catch((error) => {
  res.send(error);
});   
  }
)

OrderRounter.get(
  "/get-data",
  (req,res)=>{
      const result=new OrderController().readOrder(req.query);
      result
.then((success) => {
  res.send(success);
})
.catch((error) => {
  res.send(error);
});   
  }
)

module.exports = OrderRounter;
