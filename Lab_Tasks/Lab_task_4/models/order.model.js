const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    productId: { 
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: { 
        type: Number,
        required: true,
        min: 1 
    },
    price: { 
        type: Number,
        required: true,
        min: 0
    }
});

const OrderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    items: [OrderItemSchema], 
    totalAmount: { 
        type: Number,
        required: true,
        min: 0
    },
    orderDate: { 
        type: Date,
        default: Date.now 
    },
    status: { 
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
        default: 'pending' 
    }
});


const Order = mongoose.model('Order', OrderSchema);

module.exports = Order; 
