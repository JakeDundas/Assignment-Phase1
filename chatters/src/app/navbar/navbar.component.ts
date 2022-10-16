import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

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
