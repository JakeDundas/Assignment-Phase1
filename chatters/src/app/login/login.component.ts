import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'ContentType': 'application/json'})
}

const BACKEND_URL = 'http://localhost:3000'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  email: string = "";

  constructor(private router: Router, private usersService: UsersService, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  attemptLogin() {
    this.httpClient.post(BACKEND_URL+'/auth', {username: this.username, email: this.email}, httpOptions).subscribe((res: any) => {
      if (res.valid) {
        localStorage.setItem('username', res.user.username)
        localStorage.setItem('email', res.user.email)
        localStorage.setItem('userId', res.user.id)
        localStorage.setItem('role', res.user.role)
        this.router.navigate(['groups'])
      } else {
        alert("Invalid User")
      }
    })
  }

  // attemptLogin() {
  //   const validUser = this.usersService.checkForUsernameEmailMatch(this.username, this.email);
  //   if (validUser) {
  //     localStorage.setItem('role', validUser.role)
  //     localStorage.setItem('username', validUser.username)
  //     localStorage.setItem('userId', validUser.id)
  //     this.router.navigate(['groups'])
  //   }
  // }


}
