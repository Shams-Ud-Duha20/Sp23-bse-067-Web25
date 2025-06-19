const express = require('express');
const router = express.Router(); 
const productList = [
    {
        items: [
            { productId: 'prod001', image: 'images/item1.jpg', series: 'THE METROPOLIS SERIES PERTE', name: 'PACKABLE BLOOM JACKET', price: 350.00 },
            { productId: 'prod002', image: 'images/item2.jpg', series: 'THE METROPOLIS SERIES PERTE', name: 'PERTE VEST', price: 220.00 },
            { productId: 'prod003', image: 'images/item3.jpg', series: 'THE METROPOLIS SERIES HYST', name: 'HYST JACKET', price: 480.00 },
            { productId: 'prod004', image: 'images/item4.jpg', series: 'THE METROPOLIS SERIES HYST', name: 'HYST BLAZER', price: 300.00 }
        ]
    },
    {
        items: [
            { productId: 'prod005', image: 'images/item1.jpg', series: 'THE METROPOLIS SERIES PERTE', name: 'SECOND BLOOM JACKET', price: 360.00 },
            { productId: 'prod006', image: 'images/item2.jpg', series: 'THE METROPOLIS SERIES PERTE', name: 'SECOND PERTE VEST', price: 230.00 },
            { productId: 'prod007', image: 'images/item3.jpg', series: 'THE METROPOLIS SERIES HYST', name: 'SECOND HYST JACKET', price: 490.00 },
            { productId: 'prod008', image: 'images/item4.jpg', series: 'THE METROPOLIS SERIES HYST', name: 'SECOND HYST BLAZER', price: 310.00 }
        ]
    }
];

router.get('/', (req, res) => {
    
    res.render('index', {
        title: 'Home',   
        products: productList 
    });
});

router.get('/products', (req, res) => {
    
    res.render('products', { title: 'All Products', products: productList }); 
});

router.get('/categories', (req, res) => {
    
    res.render('categories', { title: 'Categories' });
});

router.get('/about', (req, res) => {
    
    res.render('about', { title: 'About Our Brand' });
});

module.exports = router; 
