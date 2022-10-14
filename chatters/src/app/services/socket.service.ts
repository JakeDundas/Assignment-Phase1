import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import io, { Socket } from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000/chat';


@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private socket: any;
  constructor() { }

  initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  joinRoom(selectedRoom: any): void {
    this.socket.emit("joinRoom", selectedRoom)
  }
  
  leaveRoom(selectedRoom: any): void {
    this.socket.emit("leaveRoom", selectedRoom)
  }

  joined(next: any) {
    this.socket.on('joined', (response: any) => next(response))
  }
 
  createRoom(newRoom: any) {
    this.socket.emit('newRoom', newRoom)
  }

  reqNumUsers(selectedRoom: any) {
    this.socket.emit('numUsers', selectedRoom)
  }

  getNumUsers(next: any) {
    this.socket.on('numUsers', (response: any) => next(response))
  }

  reqRoomList() {
    this.socket.emit('roomList', 'list please')
  }
  
  getRoomList(next: any) {
    this.socket.on('roomList', (response: any) => next(response))
  }

  notice(next: any) {
    this.socket.on('notice', (response: any) => next(response))
  }

  sendMessage(message: string) {
    this.socket.emit('message', message)
  }

  getMessage(next: any) {
    this.socket.on('message', (message: any) => next(message))
  }
}


// import { Injectable } from '@angular/core';
// import io from 'socket.io-client';
// const SERVER_URL = 'http://localhost:3000';

// @Injectable({
//   providedIn: 'root'
// })
// export class SocketService {
//   private socket: any;
//   constructor() { }

//   // Setup connection to socket server
//   initSocket() {
//     this.socket = io(SERVER_URL);
//     // return () => {
//     //   this.socket.disconnect();
//     // }
//   }

//   // Emit a message to to the socket server
//   send(message: string) {
//     this.socket.emit('message', message);
//   }

//   // Listen for "message" events from the socket server
//   getMessage(next: any) {
//     this.socket.on('message', (message: any) => next(message));
//   }
// }

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
