const { auth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const express = require("express")
const User = require("../models/user")
const userRouter = express.Router()

// Get all pending requests for the loggedIn user
userRouter.get("/user/requests/received", auth, async (req, res) => {
    try{
        const loggedInUser = req.user

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"])

        console.log(connectionRequests)

        if(connectionRequests.length == 0)
            return res.send("No requests received!")
        res.send(connectionRequests)
    }
    catch(error){
        res.status(500).send("Error " + error.message)
    }
})

userRouter.get("/user/connections", auth, async (req, res) => {
    try{
        const loggedInUser = req.user

        const connections = await ConnectionRequest.find({
            $or: [
                {fromUserId : loggedInUser._id},
                {toUserId: loggedInUser._id}
            ],
            $and: [
                {status : {$eq: "accepted"}}
            ]
        }).populate("fromUserId", "firstName").populate("toUserId", "firstName")

        console.log(connections)

        const data = connections.map((ele)=>{
            if(ele.fromUserId._id.toString() === loggedInUser._id.toString())
                return ele.toUserId
            return ele.fromUserId
        })

        res.json({data})

    }
    catch(error){
        res.status(500).send("Error " + error.message)
    }
})

 userRouter.get("/user/feed", auth, async (req, res) => {
    try{

        console.log("Started!!")

        const page = req.query.page || 1
        let limit = req.query.limit || 10
        limit > 50 ? 50 : limit
        const skip = (page-1) * limit

        const loggedInUser = req.user

        const validConnections = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}
            ]
        }).populate("fromUserId", "firstName").populate("toUserId","firstName")

        console.log(validConnections)

        const inValidUsers = validConnections.map((con) => {
            if(con.fromUserId._id.toString() === loggedInUser._id.toString())
                return con.toUserId._id
            return con.fromUserId._id
        })

        console.log(inValidUsers)

        const validUserRequests = await User.find({
            $and: [
                {_id: {$nin: inValidUsers}},
                {_id: {$ne: loggedInUser._id}}
            ]    
        }).skip(skip).limit(limit)

        res.json({
            message: "These are all the valid users",
            validUserRequests
        })
    }
    catch(error){
        res.status(500).send("Error " + error.message)
    }
 })

module.exports = userRouter