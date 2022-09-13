import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../shared/group.model';
import { Channel } from '../shared/channel.model';
import { User } from '../shared/user.model';
import { GroupsService } from '../services/groups.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  groupId = "";
  group: Group;
  channels: Channel[] = [];
  currentChannel: Channel | null = null;
  
  messageContent: string = "";
  username: string = "";
  isGroupAdminOrSuperAdmin: boolean = true;
  isGroupAssis: boolean = true;


  constructor(private route: ActivatedRoute, private router: Router, private groupsService: GroupsService, private usersService: UsersService) { 
    this.groupId = this.route.snapshot.params['groupId'];
    this.group = this.groupsService.getGroupData(this.groupId);
  }

  ngOnInit(): void {
    this.getChannelsForUser();
  }

  getChannelsForUser() {
    // const username = localStorage.getItem('username');
    // const currentRole = localStorage.getItem('role');
    // if (currentRole == 'groupAdmin' || currentRole == 'superAdmin') {
    //   this.isGroupAdminOrSuperAdmin = true;
    //   this.isGroupAssis = false;
    //   this.channels = this.group.channels;
    // } else if (this.group.groupAssisUsers.includes(username)) {
    //   this.isGroupAdminOrSuperAdmin = false;
    //   this.isGroupAssis = true;
    //   this.channels = this.group.channels;
    // } else {
    //   this.isGroupAdminOrSuperAdmin = false;
    //   this.isGroupAssis = false;
    //   const userChannels = this.group.channels.filter((e: { users: any; }) => e.users.includes(username));
    //   this.channels = userChannels;
    // }
    this.channels = [];
    for (let channel of this.group.channels.values()) {
      // if (channel.has(user.id)) {
      //   this.channels.push(channel)
      // }
      this.channels.push(channel) 
    }  
  }

  changeChannel(channel: Channel) {
    if (this.currentChannel) {
      this.currentChannel.active = false;
    }
    channel.active = true;
    this.currentChannel = channel;
  }

  addNewChannel() {
    const newChannel = new Channel({name: "Channel"});
    this.group.channels.set(newChannel.id, newChannel);;
    this.updateStorage();
    this.ngOnInit();
  }

  deleteChannel(channel: Channel) {
    // TODO: deal with fringe case of deleting active channel
    this.group.channels.delete(channel.id);  
    this.updateStorage();
    this.ngOnInit();
  }

  addUserToGroup() {
    const currentUsers = this.usersService.getUsersData();
    const inputUser = this.usersService.getUserFromUsername(this.username);
    
    const userExists = currentUsers.has(inputUser.id);
    const userInGroup = this.group.users.has(inputUser.id);
    if (userExists && !userInGroup) {
      this.group.users.set(inputUser.id, inputUser);
      this.updateStorage();
      this.ngOnInit();
    }
  }

  addUserToSelectedChannel() {
    if (this.currentChannel) {
      const inputUser = this.usersService.getUserFromUsername(this.username);
      const userInGroup = this.group.users.has(inputUser.id);
      const userInChannel = this.currentChannel.users.has(inputUser.id);
      if (userInGroup && !userInChannel) {
        this.currentChannel.users.set(inputUser.id, inputUser);
        this.updateStorage();
        this.ngOnInit();
      }
    }
  }

  removeUser(user: User, channel: Channel) {
      channel.users.delete(user.id);
      this.updateStorage();
      this.ngOnInit();
  }

  promoteToGroupAssis(user: User) {
    const userInGroup = this.group.users.has(user.id);
    const userInGroupAssis = this.group.groupAssisUsers.has(user.id);
    if (userInGroup && !userInGroupAssis) {
      this.group.groupAssisUsers.set(user.id, user);
      this.updateStorage();
      this.ngOnInit();
    }
  }

  deleteGroup() {
    this.groupsService.deleteGroup(this.groupId);
    this.updateStorage();
    this.router.navigate(['groups']);
  }

  updateStorage() {
    this.groupsService.saveGroupsData();
  }

  addNewMessage() {
    if (this.currentChannel) {
      this.currentChannel.messageHistory.push(this.messageContent);
      this.updateStorage();
      this.messageContent = "";
    }
  }

}
