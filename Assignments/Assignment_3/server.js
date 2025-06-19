const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
    secret: 'supersecretkey', 
    resave: false,             
    saveUninitialized: false,  
    cookie: { maxAge: 60 * 60 * 1000 } 
}));


app.use((req, res, next) => {
    
    res.locals.user = req.session.user;
   
    res.locals.isAuthenticated = !!req.session.user;
    next(); 
});


const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

app.use('/', indexRouter);

app.use('/auth', authRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
