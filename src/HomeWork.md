- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json differences?
- Install express
- Create a Server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install'
- Difference between caret and tilde ( ^ vs ~ )


- initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with route extensions ex. /hello, /, /hello/2, /xyz
- Install PostMan app and make a Workspace/collection >  test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on PostMan
- Explore routing and use ?, +, (), * in the routes
- Use of regex in routes /a/ , /.*flys$/
- Reading the query params in the routes
- Reading the dynamic routes

- Create multiple handlers - Play with code
- next()
- next function and errors with res.send()
- practise app.use("/route", rh1, [rh2, rh3], rh4, rh5)
- What is middleware? Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference b/w app.use, app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error handling using app.use("/", (err, req, res, next) = {})

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install Mongose library
- Connect your application to the database "Connection-url"/devTinder
- Call the connectDB function and  connect to database before starting application on 7777
- Create a User Schema, user model
- Create /signUp API to add data to database
- Push some documents using POST API call

- Difference between Javascript Object vs JSON
- Add the express.json middlewate to your app
- Make ypour signup API dynamic to receive data from the end user
- user.findone with duplicate emailId's, which object will be removed
- API - Get user By Email
- API - Feed API - GET /feed - get all the usrs from the database
- API - Get User By Id
- Create a delete user API
- Diff b/w Patch and PUT
- API - UPDATE A User
- Explore documentation expecially Model methods
- What are options in Model.findOneAndUpdate method, explore more about it
- API- Update user with email

- Explore SchemaTYpe options from the documentation
- Add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validator function for gender
- Improve the DB Schema, PUT all appropriate validations on each field in Schema
- Add API level validations on patch,signup post api
- ( Data Sanitization )Add API level validations for each field
- Install Validator
- Explore Validator library and use Validator for password, email and photo url
- Never trust req.body

- Validate data in SignUp API
- Maintain a helper function
- Install dcrypt package
- create passwordHash using  bCrypt.hash & save the user
- Create login API
- compare passwords and throw errors if email or passowrd are not present

- Install cookie-parser
- just send a dummy cookie to user 
- create GET/profile Api and check if you get the cookie back
- Install jsonwebtoken
- In Login apli, after email and password validation create a JWT Token and send it back to user inside cookies
- Read the cookies inside your profile Api and find the logged in user
- Write UserAuth Middleware
- Add the userAuth middleware in profile API and new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create user schema method to getJWT()
- create  userSchema method to comparePassword(passwordInputByUser)

- Explore Tinder APIs
- Create a list of all APIs you can think of in DevTinder
- Group multiple router under respective routers
- Read documentation of express.Router
- Create Routes folder for managing auth, profile, request routers
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password Api => forgot password API
- Make sure you validate all data in every POST, PATCH apis


- Create connection request schema
- Send Connection Request API
- Proper validation of DATA
- Think about all corner cases
- $or and $and in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query/or/
- Schema.pre("save) function
- Read more about indexes in MongoDB
- Why do we index in DB?
- Read this article about compound indexes - F
- Why shouldn't we index on everything?
- ALWAYS THINK ABOUT CORNER CASES

- Write code with proper validation for POST /request/review/:status/:requestId
- Thought process - POST vs GETf
- Read about ref and populate
- Create GET /user/requests/received with all the checks

- Logic for GET /feed API
- Explore $nin, $ne, $and and other query operators - https://www.mongodb.com/docs/manual/reference/operator/query/ne/