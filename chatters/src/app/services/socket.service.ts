// import { Injectable } from '@angular/core';
// import io from 'socket.io-client';

// const SERVER_URL = 'http://localhost:3000/chat';


// @Injectable({
//   providedIn: 'root'
// })
// export class SocketService {
//   private socket;
//   constructor() { }

//   initSocket(): void {
//     this.socket = io(SERVER_URL);
//   }

//   joinRoom(selectedRoom): void {
//     this.socket.emit("joinRoom", selectedRoom)
    
//   }
  
//   leaveRoom(selectedRoom): void {
//     this.socket.emit("leaveRoom", selectedRoom)

//   }

//   joined(next) {
//     this.socket.on('joined', response => next(response))
//   }
 
//   createRoom(newRoom) {
//     this.socket.emit('newRoom', newRoom)
//   }

//   reqNumUsers(selectedRoom) {
//     this.socket.emit('numUsers', selectedRoom)
//   }

//   getNumUsers(next) {
//     this.socket.on('numUsers', response => next(response))
//   }

//   reqRoomList() {
//     this.socket.emit('roomList', 'list please')
//   }
  
//   getRoomList(next) {
//     this.socket.on('roomList', response => next(response))
//   }

//   notice(next) {
//     this.socket.on('notice', response => next(response))
//   }

//   sendMessage(message: string) {
//     this.socket.emit('message', message)
//   }

//   getMessage(next) {
//     this.socket.on('message', message => next(message))
//   }
// }
