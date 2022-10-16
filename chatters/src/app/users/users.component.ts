import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../shared/user.model';
import { DataService } from '../services/data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  usersList: User[] = [];
  username: string = "";
  email: string = "";
  password: string = "";
  isGroupAdminOrSuperAdmin: boolean = false;

  constructor(private router: Router, private dataService: DataService, private authenticationService: AuthenticationService) {
    if(localStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['login'])
    }
  }

  ngOnInit(): void {
    const currentRole = localStorage.getItem('role');
    this.isGroupAdminOrSuperAdmin = currentRole == 'groupAdmin' || currentRole == 'superAdmin' ? true : false;
    this.dataService.getAllUsers().subscribe((res: any) => {
      if(res.success) {
        this.usersList = res.users;
      } else {
        console.log(res.error)
      }
    })
  }

  addNewUser() {
    this.authenticationService.register({username: this.username, email: this.email, password: this.password}).subscribe(data => {
      console.log(data)
    })
  } 

  deleteUser(user_id: string) {
    // this.usersService.deleteUser(user);
    // this.usersService.saveUsersData();
    // this.ngOnInit();
  }
  
  promoteToGroupAdmin(user_id: string) {
    // user.role = Role.GroupAdmin;
    // this.usersService.saveUsersData();
    // this.ngOnInit();
  }
  
  promoteToSuperAdmin(user_id: string) {
    // user.role = Role.SuperAdmin;
    // this.usersService.saveUsersData();
    // this.ngOnInit();
  }

}
