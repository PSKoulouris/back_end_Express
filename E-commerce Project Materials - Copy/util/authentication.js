//save and update the session:

function createUserSession(req, user, action){
    req.session.uid = user._id.toString(); //uid correspond to the id in the database.In Mongodb, is is an object id that neesd to be converted to string 
    //req.session.name = user.name
    req.session.save(action)
}

function destroyUserAuthSession(req){
    req.session.uid = null;
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession
}

//exportts into the Controller 