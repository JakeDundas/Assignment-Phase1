import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Group } from '../shared/group.model';
import { Channel } from '../shared/channel.model';
import { Message } from '../shared/message.model';
import { DataService } from '../services/data.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-new-chat',
  templateUrl: './new-chat.component.html',
  styleUrls: ['./new-chat.component.css']
})
export class NewChatComponent implements OnInit {
  groupId = "";
  group: Group = { _id: "", name: "", groupAssisUsers: [], users: [] };

  groupName: string = "";
  messageContent: string = "";
  inputEmail: string = "";
  isGroupAdminOrSuperAdmin: boolean = true;
  isGroupAssis: boolean = true;
  currentUserId: string = ""
  messages: Message[] = [];
  channels: Channel[] = [];
  currentChannel = "";

  channelsIsCollapsed = true;
  membersIsCollapsed = true;
  assisIsCollapsed = true;

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private socketService: SocketService) {
    if (localStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['login'])
    }
    this.groupId = this.route.snapshot.params['groupId'];
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') ?? ""
    this.getGroupDetails();
    this.initialiseChannelsForUser();
    this.initIoConnection();
  }

  ngOnDestroy(): void {
    if (this.currentChannel) {
      this.currentChannel = "";
    }
  }

  private initIoConnection() {
    this.socketService.initSocket();
    
    this.socketService.getMessage((response: any) => {
      if(response.success) {
        this.messages.push(response.message);
      } else {
        console.log(response.error)
      }
    })

    this.socketService.getChannelHistory((response: any) => {
      if(response.success) {
        response.channel.messages.forEach((message: Message) => this.messages.push(message))
      } else {
        console.log(response.error)
      }
      console.log(response)
    })
  }

  getGroupDetails() {
    this.dataService.getGroup({ group_id: this.groupId }).subscribe((res: any) => {
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
      this.channels = res.channels;
    })
  }

  getUserChannels() {
    this.dataService.getAllUserChannelsInGroup({ group_id: this.groupId, user_id: localStorage.getItem('userId') }).subscribe((res: any) => {
      this.channels = res.channels;
    })
  }

  joinChannel(_id: string) {
    if (this.currentChannel == _id) {
      this.messages = [];
      this.currentChannel = "";
      // leave room
      this.socketService.leaveChannel({channel_id: _id, user_id: this.currentUserId});
    } else {
      this.dataService.getMessageHistory({ channel_id: _id }).subscribe((res: any) => {
        // this.messages = res.channel.messages;
        this.currentChannel = res.channel._id;
        this.socketService.joinChannel({channel_id: _id, user_id: this.currentUserId});
        this.reqChannelMessageHistory();
      })
    }
  }

  addNewChannel() {
    if(this.groupName) {
      this.dataService.addNewChannel({ group_id: this.groupId, name: this.groupName }).subscribe((res: any) => {
        this.groupName = ""
        this.ngOnInit();
      })
    }
  }

  deleteChannel(channel_id: string) {
    if(confirm("Are you sure to delete?")) {
      this.dataService.deleteChannel({ channel_id }).subscribe((res: any) => {
        this.ngOnInit();
      })
    
    }
  }

  addUserToGroup() {
    if(this.inputEmail) {
        this.dataService.addUserToGroup({ group_id: this.groupId, email: this.inputEmail }).subscribe((res: any) => {
          this.ngOnInit();
        })
      }
  }

  addUserToSelectedChannel() {
    if (this.currentChannel) {
      this.dataService.addUserToChannel({ channel_id: this.currentChannel, email: this.inputEmail }).subscribe((res: any) => {
          if(res.success) {
            this.ngOnInit();
          } else {
            alert(res.error)
          }
      })      
    }
  }

  removeUserFromGroup(user_id: string) {
    this.dataService.removeUserFromGroup({ group_id: this.groupId, user_id }).subscribe((res: any) => {
      this.ngOnInit();
    })
  }
  
  removeUserFromChannel(channel_id: string, user_id: string) {
    this.dataService.removeUserFromChannel({ channel_id, user_id }).subscribe((res: any) => {
      this.ngOnInit();
    })
  }
  
  promoteToGroupAssis(user_id: string) {
    const userInGroup = this.group.users.includes(user_id);
    const userInGroupAssis = this.group.groupAssisUsers.includes(user_id);
    if (userInGroup && !userInGroupAssis) {
      this.dataService.promoteUserToGroupAssis({ group_id: this.group._id, user_id }).subscribe((res: any) => {
        this.ngOnInit();
      })
    }
  }

  deleteGroup() {
    if(confirm("Are you sure to delete?")) {
      this.dataService.deleteGroup({ group_id: this.group._id }).subscribe((res: any) => {
        console.log(res)
        this.router.navigate(['groups']);
      })
    }
  }

  sendMessage() {
    if(this.messageContent && this.currentChannel) {
      // Check if there is a message to send
      this.socketService.sendMessage({channel_id: this.currentChannel, user_id: this.currentUserId, message: this.messageContent});
      this.messageContent = "";
    } else {
      console.log("No message")
    }
  }

  reqChannelMessageHistory() {
    if(this.currentChannel) {
      // Check if there is a message to send
      this.socketService.requestChannelHistory(this.currentChannel);
    } else {
      console.log("No channel selected")
    }
  }

}
