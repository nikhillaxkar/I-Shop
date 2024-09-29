const mongoose = require('mongoose');

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.ObjectId,
        ref:'Order',
        required: true
    },
    amount:{
        type: Number
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    payment_status: {
        type: Boolean,
        required: true,
        default: false // default value as false if the payment hasn't been completed
    }
}, { timestamps: true });

// Create the model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
