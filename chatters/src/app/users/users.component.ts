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
    const nonEmptyInput = (username != "" && email != "");
    if(nonEmptyInput) {
      const myuuid = uuidv4();
      const currentUsers = JSON.parse(localStorage.getItem('usersList') ?? "[]");
      
      const usernameAlreadyExists = currentUsers.some((x: { username: string; }) => x.username == username)
      if(!usernameAlreadyExists) {
        currentUsers.push({username, email, id: myuuid, role: "user"});
      localStorage.setItem('usersList', JSON.stringify(currentUsers))
      this.ngOnInit();
      }
    }
  }  


}
