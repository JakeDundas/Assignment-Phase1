const express = require("express"); //used for routing
const app = express();
const http = require("http").Server(app); //used to provide http functionality
const cors = require("cors")
const path = require("path")
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:4200", "http://192.168.0.3:4200"],
    methods: ["GET", "POST"],
  }
})

const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerApp = express();
const peerServer = require('http').createServer(peerApp);
const expressPeerServer = ExpressPeerServer(peerServer, { debug: true });
peerApp.use('/peerjs', expressPeerServer);

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/images', express.static(path.join(__dirname, './userImages')))

const sockets = require("./socket.js")
const peerjs = require("./peerjs.js")
const server = require("./listen.js")
const api = require("./routes/api")
const uploads = require("./routes/uploads")

app.use(cors());

app.post('/api/register', api.register)
app.post('/api/login', api.login)

app.post('/api/getGroupsForUser', api.getGroupsForUser)
app.post('/api/getGroup', api.getGroup)
app.get('/api/getAllGroups', api.getAllGroups)
app.post('/api/addNewGroup', api.addNewGroup)
app.post('/api/promoteUserToGroupAssis', api.promoteUserToGroupAssis)
app.post('/api/addUserToGroup', api.addUserToGroup)
app.post('/api/removeUserFromGroup', api.removeUserFromGroup)
app.post('/api/removeUserFromGroupAssis', api.removeUserFromGroupAssis)
app.post('/api/deleteGroup', api.deleteGroup)

app.post('/api/getAllChannelsInGroup', api.getAllChannelsInGroup)
app.post('/api/getAllUserChannelsInGroup', api.getAllUserChannelsInGroup)
app.post('/api/addUserToChannel', api.addUserToChannel)
app.post('/api/getMessageHistory', api.getMessageHistory)
app.post('/api/addNewChannel', api.addNewChannel)
app.post('/api/removeUserFromChannel', api.removeUserFromChannel)
app.post('/api/deleteChannel', api.deleteChannel)

app.get('/api/getAllUsers', api.getAllUsers)
app.post('/api/getUser', api.getUser)
app.post('/api/getUsersLike', api.getUsersLike)
app.post('/api/getUsersDetails', api.getUsersDetails)
app.post('/api/updateUserProfileImage', api.updateUserProfileImage)
app.post('/api/deleteUser', api.deleteUser)
app.post('/api/promoteToGroupAdmin', api.promoteToGroupAdmin)
app.post('/api/promoteToSuperAdmin', api.promoteToSuperAdmin)

app.post('/api/upload', uploads.upload)

// Define port used for socket server
const SOCKET_PORT = 3000

// Define port used for peerhs server
const PEER_PORT = 9000

// Setup socket
sockets.connect(io, PEER_PORT);

// Setup peerjs
peerjs.connect(expressPeerServer, SOCKET_PORT)

// Start server listening for requests.
server.listen(http, PEER_PORT);
server.listen(peerServer, SOCKET_PORT);

