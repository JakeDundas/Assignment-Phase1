import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.css']
})
export class ChatGroupsComponent implements OnInit {
  groupsList = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToChat(groupId: any) {
    this.router.navigate(['chat', groupId])
  }

  addNewGroup() {
    const myuuid = uuidv4();
    let currentGroups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    if(currentGroups.length) {
       currentGroups.push({name: myuuid, id: myuuid});
       localStorage.setItem('groupsList', JSON.stringify(currentGroups))
    } else {
      localStorage.setItem('groupsList', JSON.stringify([{name: myuuid, id: myuuid}]))
    }
  }

}
