const express = require("express")
const authRouter = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")
const {validateData}   = require("../utils/validation")


authRouter.post ("/signUp", async (req,res) => {

    const {firstName, lastName, password, email} = req.body
    
    try{
        // validate data
        console.log("Before Validation")
        validateData(req.body)
        console.log("Validation successful")

        // passwordHash
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        console.log(passwordHash)

        const userData = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        })


        await userData.save();
        res.send("Data added!!")

    }catch(err){

        res.status(500).send("Error adding data " + err.message)

    }

})

authRouter.post("/login", async (req, res) => {

    try{
        const {email, password} = req.body
        const user = await User.findOne({email: email})

        if(!user)
            throw new Error("Invalid credentials")

        const result = await user.validatePassword(password)

        if(result){

            const token = await user.getJWT()

            res.cookie("token", token, {expires: new Date(Date.now() + 3600000)})
            res.send("Login Successful")
        }
            
        else
            throw new Error("Invalid Creds!")
    }
    catch(error){
        res.status(500).send(error.message)
    }

})

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("Logged out successfully!")
})

module.exports = authRouter