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
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.groupsList = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
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
