function isEmpty(value){
    return !value || value.trim() === ''
}

function userCredentialsValidation(email,password){

    return ( email && email.includes('@') && password && password.trim().length >=6 )
}

function userInputValidation(email,password,name,street,postal,city){

    return (
        userCredentialsValidation(email,password) &&
        !isEmpty(name) && !isEmpty(street) && !isEmpty(postal)
        && !isEmpty(city)
    )

}
function emailIsConfrimed(email,confirmEmail){
    return email === confirmEmail
}

module.exports = {
    userCredentialsValidation : userCredentialsValidation,
    userInputValidation:userInputValidation,
    emailIsConfrimed : emailIsConfrimed
}