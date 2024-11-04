# DevTinder API's

### authRouter
- POST /signup
- Post /login
- POST /logout

### profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

### connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignore/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

### userRouter 
- GET /connections
- GET /requests/received
- GET /feed - Gets you the profiles of other users on platform

Status: ignore, interested, 