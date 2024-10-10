const express = require("express");

const {auth} = require("./middlewares/auth")


const app = express();

app.listen('7777');

// app.use("/user", auth)


app.use("/", (err,req,res,next) => {
    console.log("First error handler")
    res.status(500).send("unfortunate error")
})

app.use(
    "/getAllUserData", 
    (req, res) => {
        try{
            throw new Error("hdhdhjdh")
            res.send("All user data send");     
        }
        catch(err){
            res.status(500).send("Something went wrong")

        }
          
    }
);

app.use("/", (err,req,res,next) => {
    console.log("Second error handler")
    res.status(500).send("unfortunate error")
})





