import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Group } from '../shared/group.model';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.css']
})
export class ChatGroupsComponent implements OnInit {
  groupsList: Group[] = [];
  groupName: string = "";
  isGroupAdminOrSuperAdmin: boolean = true;
  
  constructor(private router: Router, private groupsService: GroupsService) { } 

  ngOnInit(): void {
    this.initialiseGroupsForUser();
  }

  initialiseGroupsForUser() {  
    const currentRole = localStorage.getItem('role');
    if (currentRole == 'groupAdmin' || currentRole == 'superAdmin') {
      this.isGroupAdminOrSuperAdmin = true;
      this.groupsList = this.getAllGroups();
    } else {
      this.isGroupAdminOrSuperAdmin = false;
      this.groupsList = this.getUserGroups();
    }
  }

  getAllGroups() {
    const allGroups = this.groupsService.getGroupsData();
    const groupsList = [];
    for (let group of allGroups.values()) {
      groupsList.push(group) 
    }
    return groupsList;  
  }
  
  getUserGroups() {
    const allGroups = this.groupsService.getGroupsData();
    const groupsList = [];
    const userId = localStorage.getItem('userId') ?? "";
    for (let group of allGroups.values()) {
      if (group.users.has(userId)) {
        groupsList.push(group)
      }
    }
    return groupsList;  
  }

  navigateToChat(groupId: any) {
    this.router.navigate(['chat', groupId])
  }

  addNewGroup() {
    if(this.groupName != "") {
      this.groupsService.newGroup(this.groupName);
      this.groupsService.saveGroupsData();
      this.ngOnInit();
      this.groupName = "";
    }
  }

}
