import { Injectable } from '@angular/core';
import { Group } from '../shared/group.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupsData = new Map<string, Group>;

  constructor(private localStorage: LocalStorageService) { 
    const groupsObjects = this.localStorage.getGroupsData();
    groupsObjects.forEach((groupObject: any) => {
      const group = new Group(groupObject);
      this.groupsData.set(group.id, group);
      console.log(group);
    });
  }


}
