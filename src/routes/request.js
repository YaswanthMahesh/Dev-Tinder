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

         // Checking if request is sent to yourself
        // if(toUser.equals(fromUser))
        //     return res.status(400).send("Can't send request to yourself")

        // Checking if request already sent either in one way or another
        const isRequestPresent = await ConnectionRequest.findOne({
            $or: [{fromUserId, toUserId},{fromUser: toUserId, toUserId: fromUserId}]
        })

        if(isRequestPresent){
            return res.status(400).send("Request already sent!")
        }

        console.log(toUser)

        const connectionRequest = new ConnectionRequest({
        fromUserId: fromUser._id,
        toUserId: req.params.toUserId,
        status: req.params.status,

        })

        await connectionRequest.save()

        res.send("connection request sent")
    }
    catch(error){
        res.status(400).send("Error " + error.message)
    }
   
})

module.exports = requestRouter