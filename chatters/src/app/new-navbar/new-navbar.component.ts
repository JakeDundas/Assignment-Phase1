import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarUpdaterService } from '../services/navbar-updater.service';

@Component({
  selector: 'app-new-navbar',
  templateUrl: './new-navbar.component.html',
  styleUrls: ['./new-navbar.component.css']
})
export class NewNavbarComponent implements OnInit {
  isCollapsed = true;
  isGroupAdminOrSuperAdmin = false
  isLoggedIn = false

  constructor(private router: Router, private navbarUpdaterService: NavbarUpdaterService) {
    navbarUpdaterService.itemValue.subscribe((nextValue) => {
      if(nextValue == 'groupAdmin' || nextValue == 'superAdmin') {
        this.isGroupAdminOrSuperAdmin = true
      } else {
        this.isGroupAdminOrSuperAdmin = false
      }
    })
    
    navbarUpdaterService.loggedInValue.subscribe((nextValue) => {
      if(nextValue == 'true') {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    })
  }

  ngOnInit(): void {
  }

  logOut() {
    this.navbarUpdaterService.isLoggedIn = ""
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    this.navbarUpdaterService.currentUserRole = ""
    this.router.navigate(['login'])
    
  }

  navigateToLogin() {
    this.router.navigate(['login'])
  }

}
