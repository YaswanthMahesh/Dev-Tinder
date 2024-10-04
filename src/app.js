const express = require("express");

const app = express();

app.listen(7777, () => {
    console.log("Server created Successfully");
});

app.use('/test',(req, res) => {
    res.send("HELLO test!")
})