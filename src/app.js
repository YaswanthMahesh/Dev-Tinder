const express = require("express");

const app = express();

app.listen(7777, () => {
    console.log("Server created Successfully");
});


app.get('/user/:userId',(req, res) => {
    console.log(req.params);
    res.send({firstName: "Yaswanth", lastName: "Nandigam"});
})

