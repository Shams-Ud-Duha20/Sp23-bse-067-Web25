const express = require('express');
const router = express.Router();


const productList = [
    {
        items: [
            { image: 'images/item1.jpg', series: 'THE METROPOLIS SERIES PERTE', name: 'PACKABLE BLOOM JACKET' },
            { image: 'images/item2.jpg', series: 'THE METROPOLIS SERIES PERTE', name: 'PERTE VEST' },
            { image: 'images/item3.jpg', series: 'THE METROPOLIS SERIES HYST', name: 'HYST JACKET' },
            { image: 'images/item4.jpg', series: 'THE METROPOLIS SERIES HYST', name: 'HYST BLAZER' }
        ]
    },
    {
        items: [
            { image: 'images/item1.jpg', series: 'THE METROPOLIS SERIES PERTE', name: 'PACKABLE BLOOM JACKET' },
            { image: 'images/item2.jpg', series: 'THE METROPOLIS SERIES PERTE', name: 'PERTE VEST' },
            { image: 'images/item3.jpg', series: 'THE METROPOLIS SERIES HYST', name: 'HYST JACKET' },
            { image: 'images/item4.jpg', series: 'THE METROPOLIS SERIES HYST', name: 'HYST BLAZER' }
        ]
    }
];

router.get('/', (req, res) => {
    
    res.render('index', { title: 'Home', products: productList });
});


module.exports = router;
