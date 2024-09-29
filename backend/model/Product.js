const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
    },
    slug: {
      type: String,
      maxLength: 50,
    },
    price: {
      type: Number,
      min: 1,
    },
    discounted_price: {
      type: Number,
      min: 1,
    },
    image: {
      type: String,
      maxLength: 100,
    },
    status: {
      type: Boolean,
      default: true,
    },
    color:[ {
      type: Schema.Types.ObjectId,
      ref: 'Color',
       required: true

    }],
    category: {
      type: Schema.Types.ObjectId, ref: 'Category', required: true
    },
    stock: {
      type: Boolean,
      default: true,
    },
    deleted_at: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
