import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersData = new Map<string, User>;

  constructor(private localStorage: LocalStorageService) { 
    const userObjects = this.localStorage.getUsersData();
    userObjects.forEach((userObject: any) => {
      const user = new User(userObject);
      this.usersData.set(user.id, user);
      console.log(user);
    });
  }

  getUsersData() {
    return this.usersData;
  }

  getUserFromUsername(username: string) {
    for (let user of this.usersData.values()) {
      if (user.username == username) {
        return user;
      }              
    }
    return new User({username: "", email: ""});
  }

  usernameAlreadyExists(username: String) {
    for (let user of this.usersData.values()) {
      if (user.username == username) {
        return true;
      }
    }
    return false;
  }

  checkForUsernameEmailMatch(username: String, email: String) {
    for (let user of this.usersData.values()) {
      if (user.username == username && user.email == email) {
        return user;
      }
    }
    return false;
  }

  addUser(username: String, email: String) {
    const newUser = new User({username: username, email: email});
    this.usersData.set(newUser.id, newUser);
  }

  deleteUser(user: User) {
    this.usersData.delete(user.id);
  }

  saveUsersData() {
    this.localStorage.setUsersData(this.usersData);
  }
}
