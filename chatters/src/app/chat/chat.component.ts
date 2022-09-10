import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Channel } from '../shared/channel.model';
import { User } from '../shared/user.model';

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
  username: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params['groupId'];
    this.group = this.getCurrentGroupFromStorage();
  }

  getCurrentGroupFromStorage() {
    const groups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    const index = groups.findIndex((group: { id: string; }) => group.id == this.groupId);
    return groups[index];
  }

  changeChannel(channel: Channel) {
    if (this.currentChannel) {
      this.currentChannel.active = false;
    }
    channel.active = true;
    this.currentChannel = channel;
  }

  addNewChannel() {
    this.group.channels.push(new Channel("Channel"));;
    this.updateStorage();
    this.ngOnInit();
  }

  deleteChannel(channelId: string) {
    // TODO: deal with fringe case of deleting active channel
    const index = this.group.channels.findIndex((channel: { id: string; }) => channel.id == channelId);
    if (index > -1) {
      this.group.channels.splice(index, 1)
      this.updateStorage();
      this.ngOnInit();
    }
  }

  addUserToGroup() {
    const currentUsers = JSON.parse(localStorage.getItem('usersList') ?? "[]");
    const userExists = currentUsers.some((user: { username: string; }) => user.username == this.username);
    const userInGroup = this.group.users.includes(this.username);
    if (userExists && !userInGroup) {
      this.group.users.push(this.username);
      this.updateStorage();
      this.ngOnInit();
    }
  }

  addUserToSelectedChannel() {
    if (this.currentChannel) {
      const userInGroup = this.group.users.includes(this.username);
      const userInChannel = this.currentChannel.users.includes(this.username);
      if (userInGroup && !userInChannel) {
        this.currentChannel.users.push(this.username);
        this.updateStorage();
        this.ngOnInit();
      }
    }
  }

  removeUser(user: string, channelId: string) {
    const index = this.group.channels.findIndex((channel: { id: string; }) => channel.id == channelId);
    if (index > -1) {
      let channelUsers = this.group.channels[index].users;
      channelUsers.splice(channelUsers.indexOf(user, 1));
      this.updateStorage();
      this.ngOnInit();
    }
  }

  promoteToGroupAssis(user: string) {
    const userInGroup = this.group.users.includes(this.username);
    const userInGroupAssis = this.group.groupAssisUsers.includes(user);
    if (userInGroup && !userInGroupAssis) {
      this.group.groupAssisUsers.push(user);
      this.updateStorage();
      this.ngOnInit();
    }
  }

  updateStorage() {
    const groups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    const index = groups.findIndex((group: { id: string; }) => group.id == this.groupId);
    groups[index] = this.group;
    localStorage.setItem('groupsList', JSON.stringify(groups))
  }

  addNewMessage() {
    if (this.currentChannel) {
      this.currentChannel.messageHistory.push(this.messageContent);
      this.updateStorage();
      this.messageContent = "";
    }
  }

}
