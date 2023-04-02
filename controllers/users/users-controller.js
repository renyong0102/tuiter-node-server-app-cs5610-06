import people from './users.js'
let users = people

// use express instance app to declare HTTP GET
// request pattern /api/users to call a function
const UserController = (app) => {
    app.get('/api/users', findUsers)
    // map path pattern to handler function with ":"
    app.get('/api/users/:uid',findUsersById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

const updateUser = (req, res) => {
    const userId = req.params['uid'];
    // BODY includes updated fields
    const updates = req.body;
    users = users.map((usr) =>
        usr._id === userId ?
            {...usr, ...updates} :
            usr
    );
    res.sendStatus(200);
}

const createUser = (req, res) => {
    // extract new user from BODY in request
    const newUser = req.body;
    // add an _id property with unique timestamp
    newUser._id = (new Date()).getTime() + '';
    // append new user to users array
    users.push(newUser);
    res.json(newUser);
}

const deleteUser = (req, res) => {
    // get user ID from path parameter uid
    const userId = req.params['uid'];
    // filter out the user
    users = users.filter(usr =>
        usr._id !== userId);
    // respond with success code
    res.sendStatus(200);
}

const findUsersById = (req, res) => {
    // get uid from request parameter map
    const userId = req.params.uid;
    // find user in users array whose _id matches userId retrieved from params
    const user = users.find(u => u._id === userId);
    // respond to client with user found
    res.json(user)
}

// Function findUsers below retrieves the list of all users from the
// server and is mapped to the HTTP endpoint /api/users.
// function runs when /api/users requested
// responds with JSON array of users
const findUsers = (req, res) => {
    // retrieve type parameter from query
    const type = req.query.type
    // if type parameter in query
    if (type) {
        // find users of that type
        const userOfType = users.filter(u => u.type === type)
        res.json(userOfType)
        return
    }
    res.json(users)
}

export default UserController
