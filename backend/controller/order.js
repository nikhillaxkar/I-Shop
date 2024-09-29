const { razorpayinstance, verifySingnature } = require('../helper');
const Cart = require('../model/Cart');
const Order = require('../model/order');
const Transaction = require('../model/transaction');
razorpayinstance
class OrderController {
  create({ product_details, user_id, order_total, user_details }) {
    return new Promise((res, rej) => {
      try {
        const order = new Order({
          product_details,
          shipping_details: user_details,
          user_id,
          order_total,
          order_payment_type: user_details.paymentMode
        });

        order.save()
          .then((success) => {
            Cart.deleteMany({user_id:user_id})
            .then((success) => {
              if(user_details.paymentMode == 1){
                res({
                  msg: "Order placed",
                  status: 1,
                  order_id:order._id
                });
              }else{
                var options = {
                  amount: order_total*100,  // amount in the smallest currency unit
                  currency: "INR",
                  receipt: order._id
                };
                razorpayinstance.orders.create(
                  options, 
                  function(err, razorpayOrder) {
                    if(err){
                      res({
                        msg: "Unable to place order.",
                        status: 0,
                      });
                    }else{
                      Order.updateOne(
                        {_id:order._id},
                        {razorpay_order_id:razorpayOrder.id}
                      ).then(
                        ()=>{
                          res({
                            msg: "Order placed",
                            status: 1,
                            order_id:order._id,
                            razorpayOrder
                          });

                        }
                      ).catch(
                        ()=>{
                          res({
                            msg: "Unable to  place order",
                            status: 0,
                          });
                        }
                      )
                     
                    }
                  
                });
              }
                
              })
              .catch((error) => {
                
              });
          
          })
          .catch((error) => {
            rej({
              msg: "Unable to place order",
              status: 0
            });
          });
      } catch (err) {
        rej({
          msg: 'Internal server error',
          status: 0
        });
      }
    });
  }
  orderDetails(order_id){
    return new Promise(
    async(res,rej)=>{
             try {
                const order=await Order.findById(order_id);
                res({
                    msg: "Order found",
                    order,
                    status: 1
                }) 
    } catch (err) {
    rej({
    msg: 'Internal sever error',
    status: 0
    })
    }
    }
    )
  }

  handlerTransaction({amount,razorpay_response,order_id}){
    return new Promise(
    (res,rej)=>{
             try {
              if(razorpay_response.razorpay_signature){
              const isvaild=verifySingnature(
                 razorpay_response.razorpay_order_id,
                 razorpay_response.razorpay_payment_id,
                 razorpay_response.razorpay_signature,
              )
             
              if(isvaild){
              const transaction=new Transaction({
                order_id:order_id,
                razorpay_order_id:razorpay_response.razorpay_order_id,
                razorpay_payment_id:razorpay_response.razorpay_payment_id,
                amount:amount/100,
                payment_status:true
              })
              transaction.save()
                .then(
                  ()=>{
                    Order.updateOne(
                      {_id:order_id},
                      {razorpay_transaction_id:razorpay_response.razorpay_payment_id,transaction_id:transaction._id,order_status:2}
                    ).then(
                      ()=>{
                        rej({
                          msg:"Patment success",
                          status:1,
                          order_id
                         })
                      }
                    ).catch(
                      ()=>{
                        rej({
                          msg:"internal",
                          status:0
                         })
                      }
                    )
                  }
                ).catch(
                  ()=>{
                    rej({
                      msg:"internal",
                      status:0
                     })
                  }
                )
              
              }else{
                 rej({
                  msg:"Payment not verified",
                  status:0
                 })
              }}  else{
                const transaction=new Transaction({
                  order_id:order_id,
                  razorpay_order_id:razorpay_response.order_id,
                  razorpay_payment_id:razorpay_response.payment_id,
                  amount:amount/100,
                  payment_status:false
                })
                transaction.save()
                  .then(
                    ()=>{
                      Order.updateOne(
                        {_id:order_id},
                        {razorpay_transaction_id:razorpay_response.payment_id,transaction_id:transaction._id,order_status:2}
                      ).then(
                        ()=>{
                          rej({
                            msg:"Patment failed",
                            status:0,
                            order_id
                           })
                        }
                      ).catch(
                        ()=>{
                          rej({
                            msg:"internal several error",
                            status:0
                           })
                        }
                      )
                    }
                  ).catch(
                    ()=>{
                      rej({
                        msg:"internal",
                        status:0
                       })
                    }
                  )
                  
              }
    } catch (err) {
    rej({
    msg: 'Internal sever error',
    status: 0
    })
    }
    }
    )
  }

  readTransaction(id){
    return new Promise(
  async (res,rej)=>{
             try {
              let data=[];
              if(id){
                data=await Transaction.findById(id);
              }else{
                data=await Transaction.find();
              }
              res({
                data,
                status:1
              })

    } catch (err) {
    rej({
    msg: 'Internal sever error',
    status: 0
    })
    }
    }
    )
  }

  readOrder(query){
    return new Promise(
  async (res,rej)=>{
             try {
              const dbQuery={};
              if(query.order_id){
                dbQuery._id=query.order_id;
              }
              if(query.user_id){
                dbQuery.user_id=query.user_id
              }
              const dateFilter={};

              if(query.start && query.end){
                const startDate=new Date(query.start);
                const endDate=new Date(query.end);
                dateFilter.startDate=startDate.toISOString();
                dateFilter.endDate=endDate.toISOString();

              }
              console.log(dateFilter)
                const order_data=await Order.find({
                  ...dbQuery,
             }).populate(['user_id', 'transaction_id']);
              
              res({
                order_data,
                status:1
              })

    } catch (err) {
    rej({
    msg: 'Internal sever error',
    status: 0
    })
    }
    }
    )
  }
}



module.exports = OrderController;
