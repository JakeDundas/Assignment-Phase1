import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../shared/user.model';
import { DataService } from '../services/data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css']
})
export class NewUsersComponent implements OnInit {
  usersList: User[] = [];
  username: string = "";
  email: string = "";
  password: string = "";
  isSuperAdmin: boolean = false;

  constructor(private router: Router, private dataService: DataService, private authenticationService: AuthenticationService) {
    if(localStorage.getItem('isLoggedIn') != 'true') {
      this.router.navigate(['login'])
    }
  }

  ngOnInit(): void {
    const currentRole = localStorage.getItem('role');
    this.isSuperAdmin = currentRole == 'superAdmin'
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
      this.username = "";
      this.email = "";
      this.password = "";
      this.ngOnInit()
    })
  } 

  deleteUser(user_id: string) {
    this.dataService.deleteUser({user_id}).subscribe(data => {
      this.ngOnInit()
    })
  }
  
  promoteToGroupAdmin(user_id: string) {
    this.dataService.promoteToGroupAdmin({user_id}).subscribe(data => {
      this.ngOnInit()
    })
  }
  
  promoteToSuperAdmin(user_id: string) {
    this.dataService.promoteToSuperAdmin({user_id}).subscribe(data => {
      this.ngOnInit()
    })
  }

}
