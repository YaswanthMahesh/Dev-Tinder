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