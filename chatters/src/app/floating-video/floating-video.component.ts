import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VideoChatService } from '../services/video-chat.service';
import { Peer } from 'peerjs'


@Component({
  selector: 'app-floating-video',
  templateUrl: './floating-video.component.html',
  styleUrls: ['./floating-video.component.css']
})
export class FloatingVideoComponent implements OnInit {
  @ViewChild('videoChat', { static: true }) videoChat!: ElementRef
  isHidden = true;
  peerId = ""
  peer: any
  stream: any
  
  constructor(private videoChatService: VideoChatService) {
    videoChatService.videoHiddenValue.subscribe((nextValue) => {
      this.isHidden = nextValue === 'true';
    })
   }

  ngOnInit(): void {
    const video = this.videoChat.nativeElement
    const userId = localStorage.getItem("userId") ?? ""
    this.peer = new Peer(userId, {host: 'localhost', port: 9000, path: '/peerjs', secure: false, debug: 1})
    this.peer.on('open', (id: string) => {
      this.peerId = id
      console.log('My peer ID is: ' + id)
    })

    this.peer.on('connection', (conn: any) => {
      conn.on('open', function () {
        // Receive messages
        conn.on('data', function (data: any) {
          console.log('Received', data);
        });

        // Send messages
        conn.send('Hello!');
      });
    })

    const navMedia = <any>navigator;
    navMedia.getUserMedia = (navMedia.getUserMedia || navMedia.webkitGetUserMedia || navMedia.mozGetUserMedia || navMedia.msGetUserMedia);

    this.peer.on('call',  (call: any) => {
      this.videoChatService.videoChatHidden = 'false'
      // Answer the call, providing our mediaStream
      navMedia.getUserMedia({ video: true, audio: true }, (stream: any) => {
        this.stream = stream
        call.answer(stream);
        call.on('stream', (remotestream: Blob | MediaSource) => {
          video.srcObject = remotestream;
          var playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.then((_: any) => {
              // Automatic playback started!
              // Show playing UI.
            })
            .catch((error: any) => {
              // Auto-play was prevented
              // Show paused UI.
            });
          }        
        })
      }, (err: any) => {
        console.log('Failed to get stream', err);
      })
    });
  }

  ngOnDestroy(): void {
    this.peer.disconnect();
  }

  public videoConnect(destPeerId: string) {
    const video = this.videoChat.nativeElement
    
    const navMedia = <any>navigator;
    navMedia.getUserMedia = (navMedia.getUserMedia || navMedia.webkitGetUserMedia || navMedia.mozGetUserMedia || navMedia.msGetUserMedia);

    navMedia.getUserMedia({ video: true, audio: true }, (stream: any) => {
      this.stream = stream
      const call = this.peer.call(destPeerId, stream);
      call.on('stream', (remotestream: Blob | MediaSource) => {
        video.srcObject = remotestream;
        var playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.then((_: any) => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch((error: any) => {
            // Auto-play was prevented
            // Show paused UI.
          });
        } 
      })
    }, (err: any) => {
      console.log('Failed to get stream', err);
    })
  }

  hideVideo(){
    this.videoChatService.videoChatHidden = "true"
    this.stream.getTracks().forEach((track: { stop: () => void; }) => {
      track.stop();
    });
  }

}
