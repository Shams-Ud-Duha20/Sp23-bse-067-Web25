
const express = require('express'); 
const expressLayouts = require('express-ejs-layouts'); 
const session = require('express-session'); 
const mongoose = require('mongoose'); 


const app = express();
const PORT = 3000; 


const MONGODB_URI = 'mongodb://localhost:27017/';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected successfully to MongoDB!'))
    .catch(err => console.error('Error connecting to MongoDB:', err)); 


app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views'); 
app.use(expressLayouts); 
app.set('layout', 'layouts/layout'); 


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.use(session({
    secret: 'aVerySecretStringForMyWebsite', 
    resave: false,             
    saveUninitialized: false,  
    cookie: { maxAge: 60 * 60 * 1000 } 
}));


app.use((req, res, next) => {
    
    res.locals.user = req.session.user;
    
    res.locals.isAuthenticated = !!req.session.user;
    
    next();
});


const indexRouter = require('./routes/index.router');
const authRouter = require('./routes/auth.router');   
const orderRouter = require('./routes/order.router'); 
const cartRouter = require('./routes/cart.router');

app.use('/', indexRouter);           
app.use('/auth', authRouter);        
app.use('/my-orders', orderRouter);  
app.use('/cart', cartRouter);

app.listen(PORT, () => {
    console.log(`Website is running at http://localhost:${PORT}`);
});
