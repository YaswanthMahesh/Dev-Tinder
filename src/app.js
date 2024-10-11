const express = require("express");

const connectDb = require("./config/database.js")

const User = require("./models/user")

const app = express();

app.put("/signUp", async (req,res) => {
    const userData = new User({
        firstName: "Rohith",
        lastName: 23,
        email: "arun@gmail.com",
        test: 20,
        age: 25
    })

    try{

        await userData.save();
        res.send("Data added!!")

    }catch(err){

        res.send("Error adding data " + err.message)

    }

})

connectDb().then(() => {
    console.log("Connection established succesffully!!")
    app.listen('7777', () => {
        console.log("Connected to port 7777")
    });

}).catch(() => {
    console.log("Connection failed!")
})

 





