

const Product = require('../models/product.model'); 


exports.getAddProductPage = (req, res) => {
    res.render('admin/add_product', {
        title: 'Add New Product',
        product: null, 
        errors: []
    });
};


exports.createProduct = async (req, res) => {
    const { name, price, description, imageUrl, category } = req.body;
    let errors = [];

    
    if (!name || !price || !description) {
        errors.push('Name, price, and description are required.');
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
        errors.push('Price must be a positive number.');
    }

    if (errors.length > 0) {
        return res.render('admin/add_product', {
            title: 'Add New Product',
            product: req.body, 
            errors
        });
    }

    try {
        const newProduct = new Product({
            name,
            price: parseFloat(price),
            description,
            imageUrl: imageUrl || '/images/placeholder.jpg', 
            category
        });
        await newProduct.save(); 

        req.session.success_msg = `${name} added successfully!`;
        res.redirect('/admin/products'); 

    } catch (err) {
        console.error('Error adding product:', err);
        req.session.error_msg = 'Failed to add product. Please try again.';
        res.redirect('/admin/products/add');
    }
};

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); 
        res.render('admin/list_products', {
            title: 'Manage Products',
            products
        });
    } catch (err) {
        console.error('Error listing products:', err);
        req.session.error_msg = 'Failed to load products.';
        res.redirect('/admin/dashboard'); 
    }
};


exports.getEditProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); 
        if (!product) {
            req.session.error_msg = 'Product not found.';
            return res.redirect('/admin/products');
        }
        res.render('admin/edit_product', {
            title: 'Edit Product',
            product, // Pass existing product data to the form
            errors: []
        });
    } catch (err) {
        console.error('Error fetching product for edit:', err);
        req.session.error_msg = 'Failed to load product for editing.';
        res.redirect('/admin/products');
    }
};


exports.updateProduct = async (req, res) => {
    const { name, price, description, imageUrl, category } = req.body;
    let errors = [];

    // Basic validation
    if (!name || !price || !description) {
        errors.push('Name, price, and description are required.');
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
        errors.push('Price must be a positive number.');
    }

    if (errors.length > 0) {
        
        return res.render('admin/edit_product', {
            title: 'Edit Product',
            product: { _id: req.params.id, ...req.body }, 
            errors
        });
    }

    try {
        await Product.findByIdAndUpdate(req.params.id, {
            name,
            price: parseFloat(price),
            description,
            imageUrl: imageUrl || '/images/placeholder.jpg',
            category
        });

        req.session.success_msg = `${name} updated successfully!`;
        res.redirect('/admin/products');

    } catch (err) {
        console.error('Error updating product:', err);
        req.session.error_msg = 'Failed to update product. Please try again.';
        res.redirect(`/admin/products/edit/${req.params.id}`);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        if (result) {
            req.session.success_msg = 'Product deleted successfully!';
        } else {
            req.session.error_msg = 'Product not found or already deleted.';
        }
    } catch (err) {
        console.error('Error deleting product:', err);
        req.session.error_msg = 'Failed to delete product. Please try again.';
    } finally {
        res.redirect('/admin/products'); 
    }
};
