const dbOperations = require("./routes/dbOperations")

module.exports = {
  connect: function (io, PORT) {
    let socketRoom = [];
    var socketRoomNum = [];

    const chat = io.of("/chat");

    chat.on("connection", async (socket) => {
      // When a connection request comes in output to the server console
      console.log("User connection on port " + PORT + ": " + socket.id);

      // socket.on("joinRoom", (room))
      // When a message comes in, emit it back to all sockets with the message
      // socket.on('message', (message) => {
      //     chat.emit('message', message);
      // })
      socket.on("message", (message) => {
        console.log(message)
        for (i=0; i < socketRoom.length; i++) {
            if (socketRoom[i][0] == socket.id) {
                chat.to(socketRoom[i][1]).emit('message', message)
            }
        }
        // chat.emit("message", message);
      });

      socket.on("joinChannel", (channel_id) => {
        console.log(channel_id)
        socket.join(channel_id)
        socketRoom.push([socket.id, channel_id])
      });

      socket.on("leaveChannel", (channel_id) => {
        console.log(channel_id)
        for (i=0; i < socketRoom.length; i++) {
            if(socketRoom[i][0] == socket.id) {
                socketRoom.splice(i, 1)
                socket.leave(channel_id)
            }
        }
      });

      socket.on("channelHistory", async (channel_id) => {
        // monogodb call to get history
        const result = await dbOperations.getMessageHistory(channel_id)
        chat.to(socket.id).emit('channelHistory', result)
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
