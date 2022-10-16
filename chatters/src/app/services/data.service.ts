import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  uri = "http://localhost:3000/"

  constructor(private httpClient: HttpClient) { }

  // Groups
  // Get Groups that user is in
  getGroupsForUser(user: { _id: string | null }) {
    return this.httpClient.post<any>(this.uri + 'api/getGroupsForUser', user);
  }

  // Get all groups
  getAllGroups() {
    return this.httpClient.get<any>(this.uri + 'api/getAllGroups');
  }

  // Get all groups
  getGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.uri + 'api/getGroup', group);
  }

  // Add new group
  addNewGroup(group: { name: string }) {
    return this.httpClient.post<any>(this.uri + 'api/addNewGroup', group);
  }

  // Add new group
  deleteGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.uri + 'api/deleteGroup', group);
  }

  // Promote User To Group Assis
  promoteUserToGroupAssis(group: { group_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.uri + 'api/promoteUserToGroupAssis', group);
  }

  // Promote User To Group Assis
  addUserToGroup(user: { group_id: string, email: string }) {
    return this.httpClient.post<any>(this.uri + 'api/addUserToGroup', user);
  }

  // remove User From Group
  removeUserFromGroup(group: { group_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.uri + 'api/removeUserFromGroup', group);
  }

  // Channels
  // Get channels for a group that user is in
  getAllUserChannelsInGroup(group: { group_id: string, user_id: string | null }) {
    return this.httpClient.post<any>(this.uri + 'api/getAllUserChannelsInGroup', group);
  }

  // Get all channels for a group
  getAllChannelsInGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.uri + 'api/getAllChannelsInGroup', group);
  }

  // Add new channel
  addNewChannel(group: { group_id: string, name: string }) {
    return this.httpClient.post<any>(this.uri + 'api/addNewChannel', group);
  }

  // Promote User To Group Assis
  addUserToChannel(user: { channel_id: string, email: string }) {
    return this.httpClient.post<any>(this.uri + 'api/addUserToChannel', user);
  }

  // Get message history for channel
  getMessageHistory(channel: { channel_id: string }) {
    return this.httpClient.post<any>(this.uri + 'api/getMessageHistory', channel);
  }

  // Add new group
  removeUserFromChannel(channel: { channel_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.uri + 'api/removeUserFromChannel', channel);
  }

  // Add new group
  deleteChannel(channel: { channel_id: string }) {
    return this.httpClient.post<any>(this.uri + 'api/deleteChannel', channel);
  }

  // Users
  // Get all groups
  getAllUsers() {
    return this.httpClient.get<any>(this.uri + 'api/getAllUsers');
  }


}
