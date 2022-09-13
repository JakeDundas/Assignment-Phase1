import { Injectable } from '@angular/core';
import { Group } from '../shared/group.model';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getGroupsData() {
    const groupsData = JSON.parse(localStorage.getItem('groupsList') ?? "[]", this.reviver);
    return groupsData;
  }

  setGroupsData(groupsData: Map<string, Group>) {
    localStorage.setItem('groupsList', JSON.stringify(groupsData, this.replacer));
  }

  getUsersData() {
    const usersData = JSON.parse(localStorage.getItem('usersList') ?? "[]", this.reviver);
    return usersData;
  }

  setUsersData(usersData: Map<string, User>) {
    localStorage.setItem('usersList', JSON.stringify(usersData, this.replacer));
  }

  replacer(key: any, value: any[]) {
    if(value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    } else {
      return value;
    }
  }

  reviver(key: any, value: any) {
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }
}
