function getSessionData(req){
    const sessionData = req.session.flashedData // get the session data from the request object.
    //empty key
    req.session.flashedData = null
    return sessionData
}

function flashDataToSession(req, data, action){
    req.session.flashedData = data
    req.session.save(action)
}

module.exports = {
    getSessionData,
    flashDataToSession
}