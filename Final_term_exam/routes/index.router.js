const express = require('express');
const router = express.Router(); 
const Product = require('../models/product.model'); 

router.get('/', async (req, res) => {
    try {
        
        const products = await Product.find().limit(8).sort({ createdAt: -1 });

        const productSets = [];
        for (let i = 0; i < products.length; i += 4) {
            productSets.push({ items: products.slice(i, i + 4) });
        }

        res.render('index', {
            title: 'Home',
            products: productSets.length > 0 ? productSets : [ { items: [] } ] 
        });
    } catch (err) {
        console.error('Error fetching products for home page:', err);
        res.render('index', { title: 'Home', products: [ { items: [] } ] , error_msg: 'Failed to load products.'});
    }
});


router.get('/products', async (req, res) => {
    try {
        
        const products = await Product.find().sort({ name: 1 }); 

        
        res.render('products', {
            title: 'All Products',
            products: [{ items: products }]
        });
    } catch (err) {
        console.error('Error fetching products for products page:', err);
        res.render('products', { title: 'All Products', products: [{ items: [] }], error_msg: 'Failed to load products.'});
    }
});


router.get('/categories', (req, res) => {
    
    res.render('categories', { title: 'Product Categories' });
});


router.get('/about', (req, res) => {
    res.render('about', { title: 'About Our Brand' });
});

module.exports = router; 
