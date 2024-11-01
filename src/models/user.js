const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName : {
        type: String
    },
    lastName : {
        type: String,
        default: "This is just a default name"
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error("Email not in correct format!")
        }
        
    },
    password : {
        type: String,
        required: true,
        minLength : 5,
        validate(value) {
            if(!validator.isStrongPassword(value))
                throw new Error("Not a strong password!")
        }
    },
    age : {
        type: Number,
        min: 4
    },
    skills : {
        type: [String]
    },
    gender: {
        type: String,
        lowercase: true,
        validate: (v) => {
            return ["male", "female", "other"].includes(v)
        }
    }

})

userSchema.methods.getJWT = async function () {
    const user = this
    const token = await jwt.sign({_id: user._id}, "DevTinder@123")
    return token
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {

    const user = this
    const passwordHash = user.password

    const isPassowordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPassowordValid
}

const User = mongoose.model("user", userSchema);

module.exports = User;