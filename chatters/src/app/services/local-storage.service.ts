import { Injectable } from '@angular/core';
import { Group } from '../shared/group.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getGroupsData() {
    const groupsData = JSON.parse(localStorage.getItem('groupsList') ?? "[]");
    return groupsData;
  }

  setGroupsData(groupsData: { [key: string]: Group }) {
    localStorage.setItem('groupsList', JSON.stringify(groupsData));
  }
}
