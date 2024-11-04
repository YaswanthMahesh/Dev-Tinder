const express = require("express");
const connectDb = require("./config/database.js")
const cookieParser = require("cookie-parser")

const app = express();

app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)


connectDb().then(() => {
    console.log("Connection established sucessfully!!")
    app.listen('7777', () => {
        console.log("Connected to port 7777")
    });

}).catch(() => {
    console.log("Connection failed!")
})

 





