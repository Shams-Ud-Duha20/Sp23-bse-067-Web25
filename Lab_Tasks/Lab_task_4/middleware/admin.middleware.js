exports.ensureAdmin = (req, res, next) => {
    
    if (req.session.user) {
        return next(); 
    }

    
    req.session.error_msg = 'Access Denied: Please log in as an administrator to view this resource.';
    res.redirect('/auth/login');
};