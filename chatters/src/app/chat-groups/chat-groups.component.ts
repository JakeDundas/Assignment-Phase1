import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-groups',
  templateUrl: './chat-groups.component.html',
  styleUrls: ['./chat-groups.component.css']
})
export class ChatGroupsComponent implements OnInit {
  groupsList = [{name: "Group1", id: 1}, {name: "Group2", id: 2}, {name: "Group3", id: 3}, ];
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToChat(groupId: any) {
    this.router.navigate(['chat', groupId])
  }

}
