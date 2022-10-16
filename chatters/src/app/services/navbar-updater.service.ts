import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';   

@Injectable({
  providedIn: 'root'
})
export class NavbarUpdaterService {

  itemValue = new BehaviorSubject(this.currentUserRole);

  set currentUserRole(value) {
    value = String(value)
    this.itemValue.next(value); // broadcast change to subscribers
    localStorage.setItem('role', value);
  }
 
  get currentUserRole() {
    return localStorage.getItem('role');
  }

}
