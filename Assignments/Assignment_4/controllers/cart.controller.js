exports.addToCart = (req, res) => {
    const { productId, name, price, imageUrl } = req.body;
    const quantity = parseInt(req.body.quantity || 1); 

    if (!req.session.cart) {
        req.session.cart = [];
    }

    const existingItemIndex = req.session.cart.findIndex(item => item.productId === productId);

    if (existingItemIndex > -1) {

        req.session.cart[existingItemIndex].quantity += quantity;
    } else {
        
        req.session.cart.push({
            productId,
            name,
            price: parseFloat(price), 
            quantity,
            imageUrl 
        });
    }

    req.session.success_msg = `${name} added to cart!`;
    res.redirect('/cart');
};


exports.viewCart = (req, res) => {
    const cart = req.session.cart || [];
    let totalCost = 0;

    
    cart.forEach(item => {
        totalCost += item.price * item.quantity;
    });

    res.render('cart', {
        title: 'Your Shopping Cart',
        cart: cart,
        totalCost: totalCost.toFixed(2)
    });
};


exports.updateCartItem = (req, res) => {
    const { productId, quantity } = req.body;
    const parsedQuantity = parseInt(quantity);

    if (req.session.cart) {
        const itemIndex = req.session.cart.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            if (parsedQuantity > 0) {
                
                req.session.cart[itemIndex].quantity = parsedQuantity;
                req.session.success_msg = 'Cart updated successfully!';
            } else {
                
                req.session.cart.splice(itemIndex, 1);
                req.session.success_msg = 'Item removed from cart!';
            }
        }
    }
    res.redirect('/cart'); 
};


exports.removeCartItem = (req, res) => {
    const { productId } = req.body;

    if (req.session.cart) {
        
        req.session.cart = req.session.cart.filter(item => item.productId !== productId);
        req.session.success_msg = 'Item removed from cart!';
    }
    res.redirect('/cart'); 
};

exports.proceedToCheckout = (req, res) => {
    const cart = req.session.cart || [];
    if (cart.length === 0) {
        req.session.error_msg = 'Your cart is empty. Please add some products before checking out.';
        return res.redirect('/cart');
    }

    let totalCost = 0;
    cart.forEach(item => {
        totalCost += item.price * item.quantity;
    });

    res.render('checkout', {
        title: 'Checkout',
        cart: cart,
        totalCost: totalCost.toFixed(2),
        username: req.session.user ? req.session.user.username : '',
        email: req.session.user ? req.session.user.email : ''
    });
};
