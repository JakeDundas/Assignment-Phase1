import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Group } from '../shared/group.model';

@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.css']
})
export class ChatGroupsComponent implements OnInit {
  groupsList: any;
  groupName: string = "";
  isGroupAdminOrSuperAdmin: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initialiseGroupsForUser();
  }

  initialiseGroupsForUser() {
    const allGroups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    const username = localStorage.getItem('username');
    const groupsForUser = allGroups.filter((e: { users: any; }) => e.users.includes(username))
    this.groupsList = groupsForUser;
    const currentRole = localStorage.getItem('role');
    if (currentRole == 'groupAdmin' || currentRole == 'superAdmin') {
      this.isGroupAdminOrSuperAdmin = true;
      this.groupsList = allGroups;
    } else {
      this.groupsList = groupsForUser;
    }
  }

  navigateToChat(groupId: any) {
    this.router.navigate(['chat', groupId])
  }

  addNewGroup() {
    if(this.groupName != "") {
      const currentGroups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
      currentGroups.push(new Group(this.groupName));
      localStorage.setItem('groupsList', JSON.stringify(currentGroups))
      this.ngOnInit();
      this.groupName = "";
    }
  }

}
