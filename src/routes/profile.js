const express = require("express")
const profileRouter = express.Router()
const {auth} = require("../middlewares/auth")
const {validateFields, passwordChangeValidFields} = require("../utils/validation")
const bcrypt = require("bcrypt")


profileRouter.get("/profile/view", auth, async (req, res) => {
    try{
        const user = req.user
        res.send(user)
    }
    catch(error){
        res.status(400).send("Invalid credentials: " + error.message)
    }
})

profileRouter.patch("/profile/edit", auth, async (req, res) => {
    try{

        const isFieldsValid = validateFields(req)

        const loggedInUser = req.user

        if(!isFieldsValid)
            return res.status(400).send("Invalid data fields")

        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])

        await loggedInUser.save()

        console.log(loggedInUser)

        res.json({
            message :`${loggedInUser.firstName}, your details updated successfully!`, 
            data : loggedInUser
        })

    }
    catch(error){
        res.status(400).send(error.message)
    }

})

profileRouter.patch("/profile/forgotPassword", auth, async (req, res) => {

    try{
        const loggedInUser = req.user

        const isValidData = passwordChangeValidFields(req)

        if(!isValidData)
            throw new Error("Invalid fields")

        const isValidPassword = await bcrypt.compare(req.body.currentPassword, loggedInUser.password)

        console.log(isValidPassword + " " + req.body.currentPassword + " " + loggedInUser.password)

        if(!isValidPassword)
            return res.status(400).send("Password given is not valid!")

        const hash = await bcrypt.hash(req.body.newPassword, 10);

        loggedInUser.password = hash;

        await loggedInUser.save()

        res.send("Password updated")


    }
    catch(error){
        res.status(400).send(error.message)
    }

})



module.exports = profileRouter