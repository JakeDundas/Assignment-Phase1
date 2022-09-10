import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: any;
  username: string = "";
  email: string = "";

  constructor() { }

  ngOnInit(): void {
    this.usersList = JSON.parse(localStorage.getItem('usersList') ?? "[]");
  }

  addNewUser() {
    const nonEmptyInput = (this.username != "" && this.email != "");
    if(nonEmptyInput) {
      const currentUsers = JSON.parse(localStorage.getItem('usersList') ?? "[]");
      const usernameAlreadyExists = currentUsers.some((user: { username: string; }) => user.username == this.username)
      if(!usernameAlreadyExists) {
        currentUsers.push(new User(this.username, this.email));
      localStorage.setItem('usersList', JSON.stringify(currentUsers))
      this.ngOnInit();
      }
    }
  }  


}
