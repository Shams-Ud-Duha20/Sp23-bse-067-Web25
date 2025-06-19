exports.ensureAuthenticated = (req, res, next) => {
    
    if (req.session.user) {
        return next(); 
    }
    
    req.session.error_msg = 'Please log in to view this resource.';
    res.redirect('/auth/login');
};
