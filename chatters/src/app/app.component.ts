import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatters';

  constructor(private router: Router) {}

  logOut() {
    if(localStorage.getItem('isLoggedIn') == "true") {
      localStorage.setItem('isLoggedIn', "false")
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      this.router.navigate(['login'])
    }
  }
}
