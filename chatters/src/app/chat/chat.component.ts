import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  groupId = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params['groupId'];
  }

}
