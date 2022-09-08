import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any;

  constructor() { }

  ngOnInit(): void {
    this.usersList = JSON.parse(localStorage.getItem('usersList') ?? "[]");
  }

  addNewUser(username:string, email:string) {
    // if(groupName == "") {
    //   groupName = "Default"
    // }
    // const myuuid = uuidv4();
    // const currentGroups = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    // currentGroups.push({name: groupName, id: myuuid});
    // localStorage.setItem('groupsList', JSON.stringify(currentGroups))
    this.ngOnInit();
  }  


}
