import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Role } from '../shared/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: User[] = [];
  username: string = "";
  email: string = "";
  isGroupAdminOrSuperAdmin: boolean = false;

  constructor(private router: Router, private usersService: UsersService) {
    if(localStorage.getItem('username') == null) {
      this.router.navigate(['login'])
    }
  }

  ngOnInit(): void {
    const currentRole = localStorage.getItem('role');
    this.isGroupAdminOrSuperAdmin = currentRole == 'groupAdmin' || currentRole == 'superAdmin' ? true : false;
    const users = this.usersService.getUsersData();
    this.usersList = [];
    for (let user of users.values()) {
      this.usersList.push(user) 
    }  
  }

  addNewUser() {
    const nonEmptyInput = (this.username != "" && this.email != "");
    if(nonEmptyInput) {
      const usernameAlreadyExists = this.usersService.usernameAlreadyExists(this.username)
      if(!usernameAlreadyExists) {
        this.usersService.addUser(this.username, this.email);
        this.usersService.saveUsersData();
        this.ngOnInit();
      }
    }
  } 

  deleteUser(user: User) {
    this.usersService.deleteUser(user);
    this.usersService.saveUsersData();
    this.ngOnInit();
  }
  
  promoteToGroupAdmin(user: User) {
    user.role = Role.GroupAdmin;
    this.usersService.saveUsersData();
    this.ngOnInit();
  }
  
  promoteToSuperAdmin(user: User) {
    user.role = Role.SuperAdmin;
    this.usersService.saveUsersData();
    this.ngOnInit();
  }

}
