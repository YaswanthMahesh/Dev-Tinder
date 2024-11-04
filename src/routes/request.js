const express = require("express")
const requestRouter = express.Router()

const {auth} = require("../middlewares/auth")

requestRouter.post("/sendConnectionRequest", auth, (req, res)=>{
    const user = req.user;
    res.send(user.firstName + " sent Connection request!")
})

module.exports = requestRouter