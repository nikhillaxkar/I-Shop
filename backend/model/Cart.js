const mongoose = require("mongoose");
const { Schema } = mongoose;
const CartSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
    ref:"User" 
    },
    product_id:{
        type:mongoose.Schema.ObjectId,
        ref:"Product" 

    },
    qty:{
        type:Number,
        default:1
    }
    },    
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
