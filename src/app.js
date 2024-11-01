const express = require("express");
const connectDb = require("./config/database.js")
const User = require("./models/user")
const {validateData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {auth} = require("./middlewares/auth")

const app = express();

app.use(express.json())
app.use(cookieParser())

app.post ("/signUp", async (req,res) => {

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

app.post("/login", async (req, res) => {

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

app.get("/profile", auth, async (req, res) => {
    try{
        const user = req.user
        res.send(user)
    }
    catch(error){
        res.status(400).send("Invalid credentials: " + error.message)
    }
})

app.post("/sendConnectionRequest", auth, (req, res)=>{
    const user = req.user;
    res.send(user.firstName + " sent Connection request!")
})


app.get("/user", async (req, res) => {
    const email = req.body.email;
    try{
        const user = await User.findOne({email: email});
        res.send(user)
    }
    catch(err){
        res.status(500).send("Something went wrong");
    }
})

// Get user by email
app.get("/users", async (req,res) => {
    const email = req.body.email;
    try{

        console.log(email)
        const user = await User.find().exec();
        if(user.length === 0)
            res.status(400).send("No user Data found!")
        else
            res.send(user);

    }
    catch(err){
        res.status(500).send("Something went wrong");
    }
    
})

app.get("/userById", async (req,res) => {
    try{

        const user = await User.findById(req.body.id);
        res.send(user)

    }
    catch(err){
        res.status(500).send("something went wrong!")
    }
})


app.delete("/user", async (req,res) => {
    const userId = req.body.userId;
    try{
        console.log(userId)
        const deletedUser = await User.findOneAndDelete({email : "arun@gmail.com"});
        if(!deletedUser)
            res.status(400).send("No user data deleted!")
        else
            res.send("User deleted successfully")

    }catch(err){

        res.send("Error deleting data " + err.message)

    }
})

app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    console.log("User Id is: " + userId)
    
    try{
        const Updatable_fields = ["userId", "password", "skills", "firstName", "email"]

        const isUpdatable = Object.keys(req.body).every((k) => Updatable_fields.includes(k))
        if(!isUpdatable)
            throw new Error("Invalid fields to update")
        if(req.body.skills.length > 1)
            throw new Error("Can't have more than 1 skill")

        const data = req.body
        const newData = await User.findByIdAndUpdate(userId, data, {new: true, runValidators: true});
        console.log(newData)
        res.send("Data updated successfully!!")

    }catch(err){

        res.send("Error updating data " + err.message)

    }

})

connectDb().then(() => {
    console.log("Connection established sucessfully!!")
    app.listen('7777', () => {
        console.log("Connected to port 7777")
    });

}).catch(() => {
    console.log("Connection failed!")
})

 





