// const Order = require('../models/order.model'); 
const dummyOrders = [
    {
        _id: '65f6a9e8b3e8a9f8e7d6c5b4',
        userId: 'someUserId123', 
        items: [
            { productId: 'prod001', productName: 'Packable Bloom Jacket', quantity: 1, price: 350.00 },
            { productId: 'prod002', productName: 'Perte Vest', quantity: 1, price: 220.00 }
        ],
        totalAmount: 570.00,
        orderDate: new Date('2024-03-15T10:00:00Z'),
        status: 'delivered'
    },
    {
        _id: '65f6a9e8b3e8a9f8e7d6c5b5',
        userId: 'someUserId123', 
        items: [
            { productId: 'prod003', productName: 'Hyst Jacket', quantity: 1, price: 480.00 },
            { productId: 'prod004', productName: 'Hyst Blazer', quantity: 1, price: 300.00 },
            { productId: 'prod001', productName: 'Packable Bloom Jacket', quantity: 2, price: 350.00 }
        ],
        totalAmount: 1480.00,
        orderDate: new Date('2024-04-20T14:30:00Z'),
        status: 'processing'
    },
    {
        _id: '65f6a9e8b3e8a9f8e7d6c5b6',
        userId: 'anotherUserId456', // This order belongs to a different user
        items: [
            { productId: 'prod005', productName: 'Urban Cargo Pants', quantity: 1, price: 180.00 }
        ],
        totalAmount: 180.00,
        orderDate: new Date('2024-05-01T09:15:00Z'),
        status: 'shipped'
    }
];

exports.getMyOrders = async (req, res) => {
    
    const loggedInUserId = req.session.user.id; 
    const userOrders = dummyOrders.filter(order => String(order.userId) === String(loggedInUserId));

    
    userOrders.sort((a, b) => b.orderDate - a.orderDate);


    res.render('my_orders', {
        title: 'My Orders',
        orders: userOrders 
    });
};
