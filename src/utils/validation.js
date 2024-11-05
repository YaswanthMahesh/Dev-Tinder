const validator = require("validator")

const validateData = (req)  => {
    console.log("Entered")
    if(!req.firstName || !req.lastName)
        throw new Error("Name is not valid")
    else if(!validator.isEmail(req.email))
        throw new Error("Invalid email");
    else if(!validator.isStrongPassword(req.password))
        throw new Error("Please give a strong password")
    console.log("About to exit")
}

const validateFields = (req) => {
    const validDataFields = ["firstName", "lastName", "email", "skills"]

    const isValidData = Object.keys(req.body).every(key => validDataFields.includes(key))

    return isValidData
}

const passwordChangeValidFields = (req) => {
    const validFields = ["currentPassword", "newPassword"]

    const isValidData = Object.keys(req.body).every(key => validFields.includes(key))

    return isValidData
}

module.exports = {validateData, validateFields, passwordChangeValidFields}