import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Peer } from 'peerjs'


const LOCAL_SERVER_URL = 'http://localhost:3000/';
const PUBLIC_SERVER_URL = 'http://192.168.0.3:3000/';

@Injectable({
  providedIn: 'root'
})
export class VideoChatService {
  private peer: any
  isHidden = "false"
  
  videoHiddenValue = new BehaviorSubject(this.videoChatHidden);

  set videoChatHidden(value) {
    value = String(value)
    this.videoHiddenValue.next(value); // broadcast change to subscribers
    this.isHidden = value
  }
 
  get videoChatHidden() {
    return this.isHidden
  }

  constructor() { }

  initPeer(userId: string): void {
    this.peer = new Peer(userId, {host: '192.168.0.3', port: 3000, path: '/peerjs'})
    this.peer.on('open', (id: string) => {
      console.log('My peer ID is: ' + id)
    })
  }

}
