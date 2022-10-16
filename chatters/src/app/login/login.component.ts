import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { NavbarUpdaterService } from '../services/navbar-updater.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private authenticationService: AuthenticationService, private navbarUpdaterService: NavbarUpdaterService) { }

  ngOnInit(): void {
  }

  attemptLogin() {
    this.authenticationService.attemptLogin({email: this.email, password: this.password}).subscribe((res: any) => {
      if(res.error) {
        alert(res.error)
        return;
      }
      const validUser = res.user
      localStorage.setItem('isLoggedIn', "true")
      localStorage.setItem('userId', validUser._id)
      localStorage.setItem('username', validUser.username)
      this.navbarUpdaterService.currentUserRole = validUser.role
      this.router.navigate(['groups'])
    })
  }
}
