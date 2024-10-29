const validator = require("validator")

const validateData = (req) => {
    console.log("Entered")
    if(!req.firstName || !req.lastName)
        throw new Error("Name is not valid")
    else if(!validator.isEmail(req.email))
        throw new Error("Invalid email");
    else if(!validator.isStrongPassword(req.password))
        throw new Error("Please give a strong password")
    console.log("About to exit")
}

module.exports = {validateData}