import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Group } from '../shared/group.model';
import { Channel } from '../shared/channel.model';
import { Message } from '../shared/message.model';
import { DataService } from '../services/data.service';
import { SocketService } from '../services/socket.service';
import { User } from '../shared/user.model';
import { ImageUploadService } from '../services/image-upload.service';

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
  currentUserUsername: string = ""
  messages: Message[] = [];
  channels: Channel[] = [];
  currentChannel = "";

  channelsIsCollapsed = true;
  membersIsCollapsed = true;
  assisIsCollapsed = true;

  selectedFile: any;


  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private socketService: SocketService, private imageUploadService: ImageUploadService) {
    if (localStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['login'])
    }
    this.groupId = this.route.snapshot.params['groupId'];
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') ?? ""
    this.currentUserUsername = localStorage.getItem('username') ?? ""
    this.getGroupDetails();
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
      if (response.success) {
        this.dataService.getUser({user_id: response.message.user_id}).subscribe((res: any) => {
          this.messages.push({_id: response.message._id, message: response.message.message, user: res.user, type: response.message.type})
        })
      } else {
        console.log(response.error)
      }
    })

    this.socketService.getChannelHistory((response: any) => {
      if (response.success) {
        response.channel.messages.forEach((message: any) => {
          const userInGroup = this.group.users.find(x => x._id === message.user_id)
          if(userInGroup) {
            this.messages.push({_id: message._id, message: message.message, user: userInGroup, type: message.type})
          } else {
            this.dataService.getUser({user_id: message.user_id}).subscribe((res: any) => {
              this.messages.push({_id: message._id, message: message.message, user: res.user, type: res.type})
            })
          }
        })
      } else {
        console.log(response.error)
      }
    })

    this.socketService.joined((response: any) => {
      this.messages.push({_id: "joined", message: `${response} has joined the conversation`, user: {_id: "", username: "", email: "", role: "", profileImage: ""}, type: "text"});
    })

    this.socketService.hasLeft((response: any) => {
      this.messages.push({_id: "hasLeft", message: `${response} has left the conversation`, user: {_id: "", username: "", email: "", role: "", profileImage: ""}, type: "text"});
    })

  }

  getGroupDetails() {
    this.dataService.getGroup({ group_id: this.groupId }).subscribe((res: any) => {
      this.group = {_id: this.groupId, name: res.group.name, groupAssisUsers: res.group.groupAssisUsers, users: []};
      const userIdArray = res.group.users
      this.dataService.getUsersDetails(userIdArray).subscribe((res: any) => {
        this.group.users = res.users;
        this.initialiseChannelsForUser();
      })
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
      const channelsArray = res.channels;
      channelsArray.forEach((channel: any) => {
        const detailedUsers: User[] = []
        channel.users.forEach((user_id: any) => {
          const user = this.group.users.find(x => x._id === user_id)
          if(typeof user !== "undefined") {
            detailedUsers.push(user)
          }
        })
        this.channels.push({_id: channel._id, name: channel.name, users: detailedUsers})
      })
    })
  }

  getUserChannels() {
    this.dataService.getAllUserChannelsInGroup({ group_id: this.groupId, user_id: localStorage.getItem('userId') }).subscribe((res: any) => {
      this.channels = res.channels;
    })
  }

  joinChannel(_id: string) {
    if (this.currentChannel == _id) {
      // leave room
      this.socketService.leaveChannel({ channel_id: _id, username: this.currentUserUsername });
      this.messages = [];
      this.currentChannel = "";
    } else {
      this.dataService.getMessageHistory({ channel_id: _id }).subscribe((res: any) => {
        // this.messages = res.channel.messages;
        this.currentChannel = res.channel._id;
        console.log(_id, this.currentUserUsername)
        this.socketService.joinChannel({ channel_id: _id, username: this.currentUserUsername });
        this.reqChannelMessageHistory();
      })
    }
  }

  addNewChannel() {
    if (this.groupName) {
      this.dataService.addNewChannel({ group_id: this.groupId, name: this.groupName }).subscribe((res: any) => {
        this.groupName = ""
        this.ngOnInit();
      })
    }
  }

  deleteChannel(channel_id: string) {
    if (confirm("Are you sure to delete?")) {
      this.dataService.deleteChannel({ channel_id }).subscribe((res: any) => {
        this.ngOnInit();
      })

    }
  }

  addUserToGroup() {
    if (this.inputEmail) {
      this.dataService.addUserToGroup({ group_id: this.groupId, email: this.inputEmail }).subscribe((res: any) => {
        this.ngOnInit();
      })
    }
  }

  addUserToSelectedChannel() {
    if (this.currentChannel) {
      this.dataService.addUserToChannel({ channel_id: this.currentChannel, email: this.inputEmail }).subscribe((res: any) => {
        if (res.success) {
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
    const userInGroup = this.group.users.find(x => x._id === user_id);
    const userInGroupAssis = this.group.groupAssisUsers.includes(user_id);
    if (userInGroup && !userInGroupAssis) {
      this.dataService.promoteUserToGroupAssis({ group_id: this.group._id, user_id }).subscribe((res: any) => {
        this.ngOnInit();
      })
    }
  }

  deleteGroup() {
    if (confirm("Are you sure to delete?")) {
      this.dataService.deleteGroup({ group_id: this.group._id }).subscribe((res: any) => {
        console.log(res)
        this.router.navigate(['groups']);
      })
    }
  }

  sendMessage() {
    if (this.messageContent && this.currentChannel) {
      // Check if there is a message to send
      this.socketService.sendMessage({ channel_id: this.currentChannel, user_id: this.currentUserId, message: this.messageContent });
      this.messageContent = "";
    } else {
      console.log("No message")
    }
  }

  reqChannelMessageHistory() {
    if (this.currentChannel) {
      // Check if there is a message to send
      this.socketService.requestChannelHistory(this.currentChannel);
    } else {
      console.log("No channel selected")
    }
  }

  // Send Image
  onFileSelected(event: any) {
    console.log(event)
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    if (this.selectedFile && this.currentChannel) {
      const formData = new FormData()
      formData.append('image', this.selectedFile, this.selectedFile.name)
      this.imageUploadService.imageUpload(formData).subscribe((res: any) => {
        console.log(res.data.filename + ", " + res.data.size)
        this.socketService.sendImageMessage({ channel_id: this.currentChannel, user_id: this.currentUserId, message: res.data.filename })
      })
    }
  }
}
