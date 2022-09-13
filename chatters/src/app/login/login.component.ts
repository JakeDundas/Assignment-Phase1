import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  email: string = "";

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  attemptLogin() {
    const validUser = this.usersService.checkForUsernameEmailMatch(this.username, this.email);
    if (validUser) {
      localStorage.setItem('role', validUser.role)
      localStorage.setItem('username', validUser.username)
      localStorage.setItem('userId', validUser.id)
      this.router.navigate(['groups'])
    }
  }

  user() {
    localStorage.setItem('role', 'user')
    localStorage.setItem('username', 'jake')
    localStorage.setItem('userId', "186374b2-44d7-4303-be4c-44589fea7bb7")
  }
  
  groupAdmin() {
    localStorage.setItem('role', 'groupAdmin')    
  }
  
  superAdmin() {
    localStorage.setItem('role', 'superAdmin')
  }


}
