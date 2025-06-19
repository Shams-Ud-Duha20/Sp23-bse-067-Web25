const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');


router.get('/register', (req, res) => {
    
    res.render('register', { title: 'Register' });
});


router.post('/register', async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    let errors = [];

    
    if (!username || !email || !password || !confirm_password) {
        errors.push('Please enter all fields');
    }
    if (password !== confirm_password) {
        errors.push('Passwords do not match');
    }
    if (password.length < 6) {
        errors.push('Password must be at least 6 characters and contain Special characters');
    }

    if (errors.length > 0) {
        
        res.render('register', {
            title: 'Register',
            errors,
            username,
            email
        });
    } else {
        
        const existingUser = User.findByUsername(username) || User.findByEmail(email);
        if (existingUser) {
            errors.push('Username or Email already registered');
            res.render('register', {
                title: 'Register',
                errors,
                username,
                email
            });
        } else {
            
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: Date.now().toString(), 
                username,
                email,
                password: hashedPassword
            };
            User.create(newUser); 

            
            req.session.success_msg = 'You are now registered and can log in';
            res.redirect('/auth/login');
        }
    }
});


router.get('/login', (req, res) => {
    
    const message = req.session.message;
    const success_msg = req.session.success_msg;
    
    req.session.message = null;
    req.session.success_msg = null;
    res.render('login', { title: 'Login', message, success_msg });
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    
    const user = User.findByUsername(username);

    if (!user) {
        req.session.message = 'Invalid username or password';
        return res.redirect('/auth/login');
    }

    
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
    
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        
        res.redirect('/');
    } else {
        req.session.message = 'Invalid username or password';
        res.redirect('/auth/login');
    }
});


router.get('/logout', (req, res) => {
    
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.redirect('/'); 
        }
        res.redirect('/auth/login');
    });
});

module.exports = router;
