import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.css']
})
export class ChatGroupsComponent implements OnInit {
  groupsList: any;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.groupsList = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
  }

  navigateToChat(groupId: any) {
    this.router.navigate(['chat', groupId])
  }

  addNewGroup() {
    const myuuid = uuidv4();
    const currentGroups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    currentGroups.push({name: "group", id: myuuid});
    localStorage.setItem('groupsList', JSON.stringify(currentGroups))
    this.ngOnInit();
  }

}
