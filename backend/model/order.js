const mongoose = require('mongoose');
const { Schema } = mongoose;

// Order Schema
const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    order_total:{
        type:Number,
        require:true
    },
    shipping_details:{
        type: Object,
        require:true,
    },
    product_details: {
        type: Array,
        required: true
    },
    transaction_id:{
      type:mongoose.Schema.ObjectId,
      ref: 'Transaction',
      default:null
    },
    razorpay_order_id: {
      type: String,
      default:null
    },
    order_payment_type:{
        type:Number,
        enum:[1,2]
    },
    razorpay_transaction_id: {
      type: String,
      default:null

    },
    order_status: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6], // 1: Pending, 2: Confirmed, 3: Shipped, 4: Delivered, 5: Cancelled, 6: Returned
      required: true,
      default: 1
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
