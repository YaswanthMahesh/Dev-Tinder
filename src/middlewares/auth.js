
const auth = (req,res,next) => {
                const auth = "xyz"
                 console.log("Authorizing the user info")
                if(auth !== 'xyz')
                    res.status(401).send("Unauthorized user")
                 else
                    next()      
            }

module.exports = {auth}