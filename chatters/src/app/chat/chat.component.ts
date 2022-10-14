import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from '../shared/newGroup.model';
import { Channel } from '../shared/channel.model';
import { NewChannel } from '../shared/newChannel.model';
import { Message } from '../shared/message.model';
import { User } from '../shared/user.model';
import { GroupsService } from '../services/groups.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  groupId = "";
  group: Group = { _id: "", name: "", groupAssisUsers: [], users: [] };
  channels: Channel[] = [];

  newGroupName: string = "";
  messageContent: string = "";
  username: string = "";
  isGroupAdminOrSuperAdmin: boolean = true;
  isGroupAssis: boolean = true;

  messages: Message[] = [];
  newChannels: NewChannel[] = [];
  newCurrentChannel = "";

  constructor(private route: ActivatedRoute, private router: Router, private groupsService: GroupsService, private dataService: DataService) {
    if (localStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['login'])
    }
    this.groupId = this.route.snapshot.params['groupId'];
  }

  ngOnInit(): void {
    this.getGroupDetails();
    this.initialiseChannelsForUser();
  }

  ngOnDestroy(): void {
    if (this.newCurrentChannel) {
      this.newCurrentChannel = "";
    }
  }

  getGroupDetails() {
    this.dataService.getGroup({ group_id: this.groupId }).subscribe((res: any) => {
      console.log(res.group)
      this.group = res.group;
    })
  }

  initialiseChannelsForUser() {
    const currentRole = localStorage.getItem('role');
    const user_id = localStorage.getItem('userId') ?? "";
    if (currentRole == 'groupAdmin' || currentRole == 'superAdmin') {
      this.isGroupAdminOrSuperAdmin = true;
      this.isGroupAssis = false;
      this.getAllChannels();
    } else if (this.group.groupAssisUsers.includes(user_id)) {
      this.isGroupAdminOrSuperAdmin = false;
      this.isGroupAssis = true;
      this.getAllChannels();
    } else {
      this.isGroupAdminOrSuperAdmin = false;
      this.isGroupAssis = false;
      this.getUserChannels();
    }
  }

  getAllChannels() {
    this.dataService.getAllChannelsInGroup({ group_id: this.groupId }).subscribe((res: any) => {
      console.log(res.channels)
      this.newChannels = res.channels;
    })
  }

  getUserChannels() {
    this.dataService.getAllUserChannelsInGroup({ group_id: this.groupId, user_id: localStorage.getItem('userId') }).subscribe((res: any) => {
      console.log(res.channels)
      this.newChannels = res.channels;
    })
  }

  joinChannel(_id: string) {
    if (this.newCurrentChannel == _id) {
      this.messages = [];
      this.newCurrentChannel = "";
    } else {
      this.dataService.getMessageHistory({ channel_id: _id }).subscribe((res: any) => {
        console.log(res.channel)
        this.messages = res.channel.messages;
        this.newCurrentChannel = res.channel._id;
      })
    }
  }

  addNewChannel() {
    this.dataService.addNewChannel({ group_id: this.groupId, name: this.newGroupName }).subscribe((res: any) => {
      console.log(res)
      this.newGroupName = ""
      this.ngOnInit();
    })
  }

  deleteChannel(channel_id: string) {
    this.dataService.deleteChannel({ channel_id }).subscribe((res: any) => {
      console.log(res)
      this.ngOnInit();
    })
  }

  addUserToGroup() {
    // const currentUsers = this.usersService.getUsersData();
    // const inputUser = this.usersService.getUserFromUsername(this.username);

    // const userExists = currentUsers.has(inputUser.id);
    // const userInGroup = this.group.users.has(inputUser.id);
    // if (userExists && !userInGroup) {
    //   this.group.users.set(inputUser.id, inputUser);
    //   this.updateStorage();
    //   this.ngOnInit();
    // }
  }

  addUserToSelectedChannel() {
    // if (this.currentChannel) {
    //   const inputUser = this.usersService.getUserFromUsername(this.username);
    //   const userInGroup = this.group.users.has(inputUser.id);
    //   const userInChannel = this.currentChannel.users.has(inputUser.id);
    //   if (userInGroup && !userInChannel) {
    //     this.currentChannel.users.set(inputUser.id, inputUser);
    //     this.updateStorage();
    //     this.ngOnInit();
    //   }
    // }
  }

  removeUser(user: User, channel: Channel) {
    // channel.users.delete(user.id);
    // this.updateStorage();
    // this.ngOnInit();
  }

  promoteToGroupAssis(user_id: string) {
    const userInGroup = this.group.users.includes(user_id);
    const userInGroupAssis = this.group.groupAssisUsers.includes(user_id);
    if (userInGroup && !userInGroupAssis) {
      this.dataService.promoteUserToGroupAssis({ group_id: this.group._id, user_id }).subscribe((res: any) => {
        console.log(res)
        this.ngOnInit();
      })
    }
  }

  deleteGroup() {
    this.dataService.deleteGroup({ group_id: this.group._id }).subscribe((res: any) => {
      console.log(res)
      this.router.navigate(['groups']);
    })
  }

  updateStorage() {
    this.groupsService.saveGroupsData();
  }

  addNewMessage() {
    // if (this.currentChannel) {
    //   this.currentChannel.messageHistory.push(this.messageContent);
    //   this.updateStorage();
    //   this.messageContent = "";
    // }
  }

}
