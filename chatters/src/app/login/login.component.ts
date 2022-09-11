import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  user() {
    localStorage.setItem('role', 'user')
    localStorage.setItem('username', 'jake')
  }
  
  groupAdmin() {
    localStorage.setItem('role', 'groupAdmin')    
  }
  
  superAdmin() {
    localStorage.setItem('role', 'superAdmin')
  }


}
