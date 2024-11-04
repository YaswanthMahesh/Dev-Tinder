const express = require("express")
const profileRouter = express.Router()
const {auth} = require("../middlewares/auth")


profileRouter.get("/profile", auth, async (req, res) => {
    try{
        const user = req.user
        res.send(user)
    }
    catch(error){
        res.status(400).send("Invalid credentials: " + error.message)
    }
})

module.exports = profileRouter