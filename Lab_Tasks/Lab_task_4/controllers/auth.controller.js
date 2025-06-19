const bcrypt = require('bcryptjs'); 
const User = require('../models/user.model'); 


exports.getRegisterPage = (req, res) => {
    res.render('register', { title: 'Register', errors: [], username: '', email: '' });
};

exports.registerUser = async (req, res) => {
    
    const { username, email, password, confirm_password } = req.body;
    let errors = []; 

    if (!username || !email || !password || !confirm_password) {
        errors.push('Please fill in all fields.');
    }
    if (password !== confirm_password) {
        errors.push('Passwords do not match.');
    }
    if (password.length < 6) {
        errors.push('Password must be at least 6 characters long & contain special characters');
    }

    if (errors.length > 0) {
        return res.render('register', {
            title: 'Register',
            errors, 
            username, 
            email
        });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });

        if (existingUser) {
            if (existingUser.username === username) {
                errors.push('This username is already taken.');
            }
            if (existingUser.email === email) {
                errors.push('This email is already registered.');
            }
            return res.render('register', {
                title: 'Register',
                errors,
                username,
                email
            });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10); 

        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        
        req.session.success_msg = 'You have successfully registered! Please log in.';
        res.redirect('/auth/login');

    } catch (err) {
        
        console.error('Error during registration:', err);
        req.session.error_msg = 'A server error occurred during registration. Please try again.';
        res.redirect('/auth/register');
    }
};

exports.getLoginPage = (req, res) => {
    
    res.render('login', { title: 'Login' });
};


exports.loginUser = async (req, res) => {
    
    const { username, password } = req.body;

    if (!username || !password) {
        req.session.error_msg = 'Please enter both username and password.';
        return res.redirect('/auth/login');
    }

    try {
        
        const user = await User.findOne({ username: username });

        
        if (!user) {
            req.session.error_msg = 'Incorrect username or password.';
            return res.redirect('/auth/login');
        }

        
        const isMatch = await bcrypt.compare(password, user.password);

        
        if (isMatch) {
            
            req.session.user = {
                id: user._id, 
                username: user.username,
                email: user.email
            };
            req.session.success_msg = `Welcome back, ${user.username}!`;
            res.redirect('/'); 
        } else {
            
            req.session.error_msg = 'Incorrect username or password.';
            res.redirect('/auth/login');
        }
    } catch (err) {
    
        console.error('Error during login:', err);
        req.session.error_msg = 'A server error occurred during login. Please try again.';
        res.redirect('/auth/login');
    }
};

exports.logoutUser = (req, res) => {

    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            req.session.error_msg = 'Could not log you out. Please try again.';
            return res.redirect('/');
        }
        res.redirect('/auth/login');
    });
};
