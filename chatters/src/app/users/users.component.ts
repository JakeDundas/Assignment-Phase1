import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User, Role } from '../shared/user.model';
import { UsersService } from '../services/users.service';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'ContentType': 'application/json'})
}

const BACKEND_URL = 'http://localhost:3000'

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

  constructor(private router: Router, private usersService: UsersService, private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    if(localStorage.getItem('isLoggedIn') != 'true') {
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

  addNewUserLocally(newUser: any) {
    const nonEmptyInput = (this.username != "" && this.email != "");
    if(nonEmptyInput) {
      const usernameAlreadyExists = this.usersService.usernameAlreadyExists(this.username)
      if(!usernameAlreadyExists) {
        this.usersService.addUserLocally(newUser);
        this.usersService.saveUsersData();
        this.ngOnInit();
      }
    }
  } 

  addNewUser() {
    // this.httpClient.post(BACKEND_URL+'/newUser', {username: this.username, email: this.email}, httpOptions).subscribe((res: any) => {
    //   if (res.valid) {        
    //     this.addNewUserLocally(res.newUser);
    //   } else {
    //     alert("Invalid User")
    //   }
    // })
    this.authenticationService.register({username: this.username, email: this.email, password: this.password}).subscribe(data => {
      console.log(data)
    })
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
