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

app.use(cors());

// Define port used for server
const PORT = 3000;

const DataManager = require('./services/dataManager').DataManager;
const dataManager = new DataManager();

require("./routes/auth").routeFunc(app, dataManager.usersList)
require("./routes/newUser").routeFunc(app, dataManager)


// Setup socket
sockets.connect(io, PORT);

// Start server listening for requests.
server.listen(http, PORT);

