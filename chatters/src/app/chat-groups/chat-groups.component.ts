import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Group } from '../shared/newGroup.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.css']
})
export class ChatGroupsComponent implements OnInit {
  groupName: string = "";
  groupsList: Group[] = [];
  isGroupAdminOrSuperAdmin: boolean = true;

  constructor(private router: Router, private dataService: DataService) {
    if (localStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['login'])
    }
  }

  ngOnInit(): void {
    this.initialiseGroupsForUser();
  }

  initialiseGroupsForUser() {
    const currentRole = localStorage.getItem('role');
    if (currentRole == 'groupAdmin' || currentRole == 'superAdmin') {
      this.isGroupAdminOrSuperAdmin = true;
      this.getAllGroups();
    } else {
      this.isGroupAdminOrSuperAdmin = false;
      this.getGroupsForUser();
    }
  }

  getAllGroups() {
    this.dataService.getAllGroups().subscribe((res: any) => {
      this.groupsList = res.groups;
    })
  }

  getGroupsForUser() {
    this.dataService.getGroupsForUser({ _id: localStorage.getItem('userId') }).subscribe((res: any) => {
      this.groupsList = res.groups;
    })
  }

  navigateToChat(groupId: any) {
    this.router.navigate(['chat', groupId])
  }

  addNewGroup() {
    if (this.groupName != "") {
      this.dataService.addNewGroup({ name: this.groupName }).subscribe((res: any) => {
        this.ngOnInit();
      })
      this.groupName = "";
    }
  }

}
