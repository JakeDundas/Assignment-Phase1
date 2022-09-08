import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.css']
})
export class ChatGroupsComponent implements OnInit {
  groupsList = [{name: "Group1", id: 1}, {name: "Group2", id: 2}, {name: "Group3", id: 3}, ];
  
  constructor() { }

  ngOnInit(): void {
  }

  navigateToChat(groupId: any) {

  }

}
