const express = require("express");

const app = express();

app.listen(7777, () => {
    console.log("Server created Successfully");
});


app.get('/user',(req, res) => {
    res.send("HELLO Hello Hello!")
})

app.use('/',(req, res) => {
    res.send("HELLO Yashu!")
})

app.post('/user',(req, res) => {
    res.send("HELLO from post!")
})
