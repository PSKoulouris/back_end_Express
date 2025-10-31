function protectRoutes(req, res, next) {
    if (!res.locals.isAuth) { //if not autenticated 
        return res.redirect('/401');
    }
    if(req.path.startsWith('/admin') && !res.locals.isAdmin){ //if not admin
        return res.redirect('/403');
    }
    next();
}

module.exports = protectRoutes