const { Channel } = require("./models/channel");

module.exports = {
    connect: function(io, PORT, groupsList, usersList) {
        var socketRoom = [];
        var socketRoomNum = [];

        const chat = io.of('/chat');
        
        chat.on('connection', (socket) => {
            // When a connection request comes in output to the server console
            console.log('User connection on port ' + PORT + ': ' + socket.id);
            
            socket.on("joinRoom", (room))
            // When a message comes in, emit it back to all sockets with the message
            // socket.on('message', (message) => {
            //     chat.emit('message', message);
            // })
            socket.on('message', (message) => {
                for (i=0; i <socketRoom.length; i++) {
                    if (socketRoom[i][0] == socket.id) {
                        chat.to(socketRoom[i][1].emit('message', message))
                    }
                }
            })

            socket.on('newRoom', newRoom => {
                const newGroup = new Channel({name: "channel"})
                groupsList.set(newGroup.id, newGroup)
                chat.emit('roomList', JSON.stringify(newGroup, replacer))
            })

            socket.on('roomsList', (m) => {
                chat.emit('roomList', JSON.stringify(newGroup, replacer))
            })

            socket.on('numUsers', (room) => {
                var userCount = 0;
                for(i=0; socketRoomNum.length; i++) {
                    if (socketRoomNum[i][0] == room) {
                        userCount = socketRoomNum[i][1]
                    }
                }

                chat.in(room).emit('numUsers', userCount)
            })

        })

        function replacer(key, value) {
            if(value instanceof Map) {
                return {
                dataType: 'Map',
                value: Array.from(value.entries()),
                };
            } else {
                return value;
            }
        }
        
        function reviver(key, value) {
            if(typeof value === 'object' && value !== null) {
              if (value.dataType === 'Map') {
                return new Map(value.value);
              }
            }
            return value;
        }
    }
}