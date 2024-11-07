const { auth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const express = require("express")
const userRouter = express.Router()

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
module.exports = userRouter