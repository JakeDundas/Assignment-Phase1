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
    if(sessionStorage.getItem('isLoggedIn') == "true") {
      sessionStorage.setItem('isLoggedIn', "false")
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role");
      this.router.navigate(['login'])
    }
  }
}
