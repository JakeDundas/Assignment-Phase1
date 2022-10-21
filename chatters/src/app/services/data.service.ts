import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  localUri = "http://localhost:3000/"
  publicUri = "http://192.168.0.3:3000/"

  constructor(private httpClient: HttpClient) { }

  // Groups
  // Get Groups that user is in
  getGroupsForUser(user: { _id: string | null }) {
    return this.httpClient.post<any>(this.localUri + 'api/getGroupsForUser', user);
  }

  // Get all groups
  getAllGroups() {
    return this.httpClient.get<any>(this.localUri + 'api/getAllGroups');
  }

  // Get all groups
  getGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/getGroup', group);
  }

  // Add new group
  addNewGroup(group: { name: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/addNewGroup', group);
  }

  // Add new group
  deleteGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/deleteGroup', group);
  }

  // Promote User To Group Assis
  promoteUserToGroupAssis(group: { group_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/promoteUserToGroupAssis', group);
  }

  // Promote User To Group Assis
  addUserToGroup(user: { group_id: string, email: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/addUserToGroup', user);
  }

  // remove User From Group
  removeUserFromGroup(group: { group_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/removeUserFromGroup', group);
  }

  // remove User From Group
  removeUserFromGroupAssis(group: { group_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/removeUserFromGroupAssis', group);
  }

  // Channels
  // Get channels for a group that user is in
  getAllUserChannelsInGroup(group: { group_id: string, user_id: string | null }) {
    return this.httpClient.post<any>(this.localUri + 'api/getAllUserChannelsInGroup', group);
  }

  // Get all channels for a group
  getAllChannelsInGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/getAllChannelsInGroup', group);
  }

  // Add new channel
  addNewChannel(group: { group_id: string, name: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/addNewChannel', group);
  }

  // Promote User To Group Assis
  addUserToChannel(user: { channel_id: string, email: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/addUserToChannel', user);
  }

  // Get message history for channel
  getMessageHistory(channel: { channel_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/getMessageHistory', channel);
  }

  // Add new group
  removeUserFromChannel(channel: { channel_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/removeUserFromChannel', channel);
  }

  // Add new group
  deleteChannel(channel: { channel_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/deleteChannel', channel);
  }

  // Users
  // Get all users
  getAllUsers() {
    return this.httpClient.get<any>(this.localUri + 'api/getAllUsers');
  }

  // Get all users
  getUsersLike(user: {user_query: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/getUsersLike', user);
  }

  // Get a user
  getUser(user: {user_id: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/getUser', user);
  }

  // Get a user
  updateUserProfileImage(user: {user_id: string, imageName: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/updateUserProfileImage', user);
  }
  
  // getUsersDetails
  getUsersDetails(users: string[]) {
    return this.httpClient.post<any>(this.localUri + 'api/getUsersDetails', users);
  }
  
  // deleteUser
  deleteUser(user: {user_id: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/deleteUser', user);
  }
  
  // promoteToGroupAdmin
  promoteToGroupAdmin(user: {user_id: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/promoteToGroupAdmin', user);
  }
  
  // promoteToSuperAdmin
  promoteToSuperAdmin(user: {user_id: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/promoteToSuperAdmin', user);
  }
}
