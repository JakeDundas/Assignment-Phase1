const { Channel } = require("./models/channel");

module.exports = {
    connect: function(io, PORT, groupsList, usersList) {
        var socketRoom = [];
        var socketRoomNum = [];

        const chat = io.of('/chat');
        
        chat.on('connection', (socket) => {
            // When a connection request comes in output to the server console
            console.log('User connection on port ' + PORT + ': ' + socket.id);

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
                newGroup = new Channel
                groupsList.set()
            })
        })
    }
}