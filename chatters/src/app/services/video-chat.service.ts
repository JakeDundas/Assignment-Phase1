import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoChatService {
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

}
