const dbOperations = require("./routes/dbOperations");

module.exports = {
  connect: function (peerServer, PORT) {
    let socketRoom = [];

    peerServer.on("connection", async (client) => {
      // When a connection request comes in output to the server console
      console.log("Peer connection " + PORT + ": " + client.id);
    })

    peerServer.on("disconnect", async (client) => {
      // When a connection request comes in output to the server console
      console.log("Peer disconnection " + PORT + ": " + client);
    })
  },
};
