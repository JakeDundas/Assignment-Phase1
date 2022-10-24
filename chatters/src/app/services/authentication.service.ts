import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  localUri = "http://localhost:3000/"

  constructor(private httpClient: HttpClient, private router: Router) { }
  // User signup
  register(user: {username: string, email: string, password: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/register', user);
  }
   // login
  attemptLogin(login: {email: string, password: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/login', login);
  }

  // logout
  logout() {
    if(localStorage.getItem('isLoggedIn') == "true") {
      localStorage.setItem('isLoggedIn', "false")
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      this.router.navigate(['login'])
    }
  }  
}
