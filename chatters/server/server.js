const express = require("express"); //used for routing
const app = express();
const http = require("http").Server(app); //used to provide http functionality
const cors = require("cors")
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  }
})
app.use(express.urlencoded({extended: true}));
app.use(express.json())


const sockets = require("./socket.js")
const server = require("./listen.js")
const api = require("./routes/api")

app.use(cors());

// Define port used for server
const PORT = 3000;

app.post('/api/register', api.register)
app.post('/api/login', api.login)

app.post('/api/getGroupsForUser', api.getGroupsForUser)
app.post('/api/getGroup', api.getGroup)
app.get('/api/getAllGroups', api.getAllGroups)
app.post('/api/addNewGroup', api.addNewGroup)
app.post('/api/promoteUserToGroupAssis', api.promoteUserToGroupAssis)
app.post('/api/addUserToGroup', api.addUserToGroup)
app.post('/api/removeUserFromGroup', api.removeUserFromGroup)
app.post('/api/deleteGroup', api.deleteGroup)

app.post('/api/getAllChannelsInGroup', api.getAllChannelsInGroup)
app.post('/api/getAllUserChannelsInGroup', api.getAllUserChannelsInGroup)
app.post('/api/addUserToChannel', api.addUserToChannel)
app.post('/api/getMessageHistory', api.getMessageHistory)
app.post('/api/addNewChannel', api.addNewChannel)
app.post('/api/removeUserFromChannel', api.removeUserFromChannel)
app.post('/api/deleteChannel', api.deleteChannel)

app.get('/api/getAllUsers', api.getAllUsers)


// Setup socket
sockets.connect(io, PORT);

// Start server listening for requests.
server.listen(http, PORT);

