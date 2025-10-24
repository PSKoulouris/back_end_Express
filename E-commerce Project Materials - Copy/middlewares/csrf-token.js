//create token csrf in  middleware:

function addCsrfToken(req,res,next){
    res.locals.csrfToken = req.csrfToken();
    next();
}

module.exports = addCsrfToken