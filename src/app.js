const express = require("express");


const app = express();

app.listen('7777');

app.use(
    "/user", 
    (requ, res, next) => {
        console.log("1st Route");
        next();
        res.send("Handling 1st Route");
        console.log("After the response")
       
    },
    (requ, res,next) => {
        console.log("2nd Route");
        // res.send("Handling 2nd Route");
        next();
        console.log("After next 2");
    }
)

