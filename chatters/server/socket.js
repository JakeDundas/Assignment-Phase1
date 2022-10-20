const dbOperations = require("./routes/dbOperations");

module.exports = {
  connect: function (io, PORT) {
    let socketRoom = [];
    var socketRoomNum = [];

    const chat = io.of("/chat");

    chat.on("connection", async (socket) => {
      // When a connection request comes in output to the server console
      console.log("User connection on port " + PORT + ": " + socket.id);

      socket.on("message", async (channel_message) => {
        const result = await dbOperations.addMessageToChannel(channel_message);
        for (i = 0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] == socket.id) {
            chat.to(socketRoom[i][1]).emit("message", result);
          }
        }
      });

      socket.on("imageMessage", async (channel_message) => {
        const result = await dbOperations.addImageMessageToChannel(channel_message);
        console.log(result)
        for (i = 0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] == socket.id) {
            chat.to(socketRoom[i][1]).emit("message", result);
          }
        }
      });

      socket.on("joinChannel", (joinRequest) => {
        console.log(joinRequest);
        socket.join(joinRequest.channel_id);
        socketRoom.push([socket.id, joinRequest.channel_id]);
        chat.to(joinRequest.channel_id).emit("joined", joinRequest.username);
      });

      socket.on("leaveChannel", (leaveRequest) => {
        console.log(leaveRequest.channel_id);
        for (i = 0; i < socketRoom.length; i++) {
          if (socketRoom[i][0] == socket.id) {
            socket.leave(leaveRequest.channel_id);
            chat.to(socketRoom[i][1]).emit("hasLeft", leaveRequest.username);
            socketRoom.splice(i, 1);
          }
        }
      });

      socket.on("channelHistory", async (channel_id) => {
        // monogodb call to get history
        const result = await dbOperations.getMessageHistory(channel_id);
        chat.to(socket.id).emit("channelHistory", result);
      });

      // socket.on('newRoom', newRoom => {
      //     const newGroup = new Channel({name: "channel"})
      //     groupsList.set(newGroup.id, newGroup)
      //     chat.emit('roomList', JSON.stringify(newGroup, replacer))
      // })

      // socket.on('roomsList', (m) => {
      //     chat.emit('roomList', JSON.stringify(newGroup, replacer))
      // })

      // socket.on('numUsers', (room) => {
      //     var userCount = 0;
      //     for(i=0; socketRoomNum.length; i++) {
      //         if (socketRoomNum[i][0] == room) {
      //             userCount = socketRoomNum[i][1]
      //         }
      //     }

      //     chat.in(room).emit('numUsers', userCount)
      // })
    });
  },
};
