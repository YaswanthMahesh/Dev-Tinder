const mongoose = require("mongoose")
const validator = require("validator")

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

const User = mongoose.model("user", userSchema);

module.exports = User;