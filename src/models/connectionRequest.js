const mongoose = require("mongoose")

const status = ["interested", "rejected", "pending", "ignore"]

const connectionRequest = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    toUserId: {type: mongoose.Schema.ObjectId},
    status: {
        type: String,
        enum: {
            values: ["interested", "rejected", "pending", "ignore"],
            message: '{VALUE} is not a valid status'
        }
    }
},
    {timestamps: true}
)

connectionRequest.pre("save", function(next){
    const connectionRequest = this

    if(connectionRequest.fromUserId .equals(connectionRequest.toUserId))
        throw new Error("You can't send request to yourself")

    next()
})

const ConnectionRequest = mongoose.model('connectionRequests', connectionRequest)

module.exports = ConnectionRequest