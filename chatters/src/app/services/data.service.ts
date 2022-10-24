import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  localUri = "http://localhost:3000/"

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

  // Get a group from id
  getGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/getGroup', group);
  }

  // Add new group
  addNewGroup(group: { name: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/addNewGroup', group);
  }

  // Delete one group by id
  deleteGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/deleteGroup', group);
  }

  // Promote User To Group Assis
  promoteUserToGroupAssis(group: { group_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/promoteUserToGroupAssis', group);
  }

  // Add User to group
  addUserToGroup(user: { group_id: string, email: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/addUserToGroup', user);
  }

  // remove User From Group
  removeUserFromGroup(group: { group_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/removeUserFromGroup', group);
  }

  // remove User From Group Assis
  removeUserFromGroupAssis(group: { group_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/removeUserFromGroupAssis', group);
  }

  // Channels
  // Get channels in a group that user is in
  getAllUserChannelsInGroup(group: { group_id: string, user_id: string | null }) {
    return this.httpClient.post<any>(this.localUri + 'api/getAllUserChannelsInGroup', group);
  }

  // Get all channels for a group
  getAllChannelsInGroup(group: { group_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/getAllChannelsInGroup', group);
  }

  // Add new channel to a group
  addNewChannel(group: { group_id: string, name: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/addNewChannel', group);
  }

  // Add user to channel
  addUserToChannel(user: { channel_id: string, email: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/addUserToChannel', user);
  }

  // remove user from channel
  removeUserFromChannel(channel: { channel_id: string, user_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/removeUserFromChannel', channel);
  }

  // delete channel from id
  deleteChannel(channel: { channel_id: string }) {
    return this.httpClient.post<any>(this.localUri + 'api/deleteChannel', channel);
  }

  // Users
  // Get all users
  getAllUsers() {
    return this.httpClient.get<any>(this.localUri + 'api/getAllUsers');
  }

  // Get all users with email containing the string
  getUsersLike(user: {user_query: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/getUsersLike', user);
  }

  // Get a users details from id
  getUser(user: {user_id: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/getUser', user);
  }

  // Update user's profileImage 
  updateUserProfileImage(user: {user_id: string, imageName: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/updateUserProfileImage', user);
  }
  
  // get details of users in an array of user id's
  getUsersDetails(users: string[]) {
    return this.httpClient.post<any>(this.localUri + 'api/getUsersDetails', users);
  }
  
  // delete User
  deleteUser(user: {user_id: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/deleteUser', user);
  }
  
  // promote user To Group Admin
  promoteToGroupAdmin(user: {user_id: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/promoteToGroupAdmin', user);
  }
  
  // promote user To Super Admin
  promoteToSuperAdmin(user: {user_id: string}) {
    return this.httpClient.post<any>(this.localUri + 'api/promoteToSuperAdmin', user);
  }
}
