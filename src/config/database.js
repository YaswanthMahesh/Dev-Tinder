const mongoose = require("mongoose")

const connectDb = async () => {
        await mongoose.connect("mongodb+srv://yashu:Yashu%40123@cluster0.30nsk.mongodb.net/devTinder");    
}

module.exports = connectDb 