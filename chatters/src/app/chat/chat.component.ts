import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Channel } from '../shared/channel.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  groupId = "";
  group: any;
  currentChannel: Channel | null = null;
  messageContent: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params['groupId'];
    this.group = this.getCurrentGroupFromStorage();
  }
  
  getCurrentGroupFromStorage() {
    const groups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    const index = groups.findIndex((x: { id: string; }) => x.id == this.groupId);
    return groups[index];
  }

  changeChannel(channel: Channel) {
    this.currentChannel = channel;
  }

  addNewChannel() {
    this.group.addNewChannel("Channel");
    this.updateStorage();
    this.ngOnInit();
  }
  
  deleteChannel(channelId: string) {
    const index = this.group.channels.findIndex((x: { id: string; }) => x.id == channelId);
    if (index > -1) {
      this.group.channels.splice(index, 1)
      this.updateStorage();
      this.ngOnInit();
    }
  }

  updateStorage() {
    const groups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    const index = groups.findIndex((x: { id: string; }) => x.id == this.groupId);
    groups[index] = this.group;
    localStorage.setItem('groupsList', JSON.stringify(groups))
  }

  addNewMessage() {
    if(this.currentChannel) {
      this.currentChannel.messageHistory.push(this.messageContent);
      this.updateStorage();
      this.messageContent = "";
    }
  }

}
