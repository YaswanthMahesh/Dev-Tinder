const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {
        type: String
    },
    lastName : {
        type: String
    },
    email: String,
    password : String,
    age : {
        type: Number
    },

})

const User = mongoose.model("user", userSchema);

module.exports = User;