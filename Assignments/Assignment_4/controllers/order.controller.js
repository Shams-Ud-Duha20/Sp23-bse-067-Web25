const Order = require('../models/order.model'); 

exports.getMyOrders = async (req, res) => {
    
    const loggedInUserId = req.session.user.id;
    try {
        

        const userOrders = await Order.find({ userId: loggedInUserId }).sort({ orderDate: -1 });

        
        res.render('my_orders', {
            title: 'My Orders',
            orders: userOrders 
        });

    } catch (err) {
        console.error('Error fetching user orders:', err);
        req.session.error_msg = 'Could not retrieve your orders. Please try again.';
        res.redirect('/'); 
    }
};

exports.placeCashOrder = async (req, res) => {
    
    if (!req.session.user || !req.session.user.id) {
        req.session.error_msg = 'Please log in to place an order.';
        return res.redirect('/auth/login');
    }

    const userId = req.session.user.id;
    const cart = req.session.cart || [];

    
    if (cart.length === 0) {
        req.session.error_msg = 'Cannot place an order with an empty cart.';
        return res.redirect('/cart');
    }

    let totalAmount = 0;
    
    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
    });

    try {
        
        const newOrder = new Order({
            userId: userId,
            items: cart.map(item => ({ 
                productId: item.productId,
                productName: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            totalAmount: totalAmount,
            status: 'pending' 
        });

        
        await newOrder.save();

        
        req.session.cart = [];

        req.session.success_msg = 'Your order has been placed successfully! Thank you for your purchase.';
        res.redirect('/my-orders'); 

    } catch (err) {
        console.error('Error placing cash order:', err);
        req.session.error_msg = 'There was an error placing your order. Please try again.';
        res.redirect('/checkout');
    }
};
