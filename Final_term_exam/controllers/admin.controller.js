// admin.controller.js
const Order = require('../models/order.model');
const User = require('../models/user.model');

/**
 * Renders the admin dashboard page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getDashboardPage = (req, res) => {
    // Renders the 'admin_dashboard' EJS template, passing the logged-in user's username.
    // The req.session.user object is populated during login by auth.controller.js
    res.render('admin/admin_dashboard', {
        title: 'Admin Dashboard',
        username: req.session.user ? req.session.user.username : 'Admin' // Default to 'Admin' if user not found
    });
};

/**
 * Fetches all orders and renders the admin orders page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getAllOrders = async (req, res) => {
    try {
        // Fetch all orders from the database, sorted by orderDate in descending order.
        // The .populate('userId') method is used to retrieve the full user object
        // associated with each order, based on the 'ref: "User"' in order.model.js.
        const orders = await Order.find().populate('userId', 'username email').sort({ orderDate: -1 });

        // Render the 'admin_orders' EJS template, passing the fetched orders.
        res.render('admin/admin_orders', {
            title: 'Manage Orders',
            orders: orders
        });
    } catch (err) {
        // Log the error and redirect with an error message in case of failure.
        console.error('Error fetching all orders:', err);
        req.session.error_msg = 'Could not retrieve orders. Please try again.';
        res.redirect('/admin/dashboard');
    }
};

/**
 * Fetches all customer (user) details and renders the admin customers page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getAllCustomers = async (req, res) => {
    try {
        // Fetch all users from the database, excluding the password field for security.
        // Users are sorted by their creation date in descending order.
        const customers = await User.find().select('-password').sort({ createdAt: -1 });

        // Render the 'admin_customers' EJS template, passing the fetched customers.
        res.render('admin/admin_customers', {
            title: 'Manage Customers',
            customers: customers
        });
    } catch (err) {
        // Log the error and redirect with an error message in case of failure.
        console.error('Error fetching all customers:', err);
        req.session.error_msg = 'Could not retrieve customer details. Please try again.';
        res.redirect('/admin/dashboard');
    }
};
