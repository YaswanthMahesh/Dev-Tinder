const express = require("express");

const {auth} = require("./middlewares/auth")


const app = express();

app.listen('7777');

app.use("/user", auth)


app.use(
    "/user/getAllUserData", 
    (req, res) => {
        res.send("All user data send");       
    }
);

app.use("/admin", (req, res) => {
    res.send("Authorizing admin data")
})


app.use("/user/deleteUser", (req,res)=>{
    const auth = "xyz"
        if(auth === 'xyz'){
            console.log("user authenticated");
            res.send("User Data Deleted");
        }
        else{
            res.status(401).send("Unauthorized user")
        }       
})




