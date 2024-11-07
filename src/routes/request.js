const express = require("express")
const requestRouter = express.Router()
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

const {auth} = require("../middlewares/auth")

requestRouter.post("/request/send/:status/:toUserId", auth, async (req, res)=>{

    try{
        const {status, toUserId} = req.params
        console.log(toUserId + " " + status)
        const fromUser = req.user;
        const fromUserId = fromUser._id

        console.log(fromUser)

        // Check if request sent to valid user
        const toUser = await User.findById(req.params.toUserId)
        if(!toUser)
            return res.status(400).send("Request send to Invalid User")

        // Checking if request already sent either in one way or another
        const isRequestPresent = await ConnectionRequest.findOne({
            $or: [
                {fromUserId: fromUserId, toUserId: toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]

        })

        if(isRequestPresent){
            return res.status(400).send("Request already sent!")
        }

        console.log(toUser)

        const connectionRequest = new ConnectionRequest({
        fromUserId: fromUser._id,
        toUserId: toUserId,
        status: status,

        })

        await connectionRequest.save()

        res.send("connection request sent")
    }
    catch(error){
        res.status(400).send("Error " + error.message)
    }
   
})

requestRouter.post("/request/review/:status/:requestId", auth, async (req, res) => {

    try {
        const loggedInUser = req.user;

        const {status, requestId} = req.params

        console.log(status + " " + requestId)

        // Status should be valid
        const allowedStatus = ["accepted", "rejected", "ignored"]
        if(!allowedStatus.includes(status))
            return res.status(400).json({message: "The status " + status + " is not valid!"})

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            status: "interested",
            toUserId: loggedInUser._id
        })

        if(!connectionRequest)
            return res.status(404).send("Data is not found!")

        console.log(connectionRequest)

        connectionRequest.status = status

        console.log(connectionRequest)

        console.log(status)

        const data = await connectionRequest.save()

        console.log(data)

        return res.json({
            message: "Request processed successfully!", data
        })

        // Valid requestId
        // status should be interested}
        // fromUserId should be loggedInUser 
    }
    catch(error){
        res.status(500).send("Error " + error.message)
    }
})

module.exports = re