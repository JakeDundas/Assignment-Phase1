import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarUpdaterService } from '../services/navbar-updater.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isGroupAdminOrSuperAdmin = false

  constructor(private router: Router, private navbarUpdaterService: NavbarUpdaterService) {
    navbarUpdaterService.itemValue.subscribe((nextValue) => {
      if(nextValue == 'groupAdmin' || nextValue == 'superAdmin') {
        this.isGroupAdminOrSuperAdmin = true
      } else {
        this.isGroupAdminOrSuperAdmin = false
      }
   })
  }

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
