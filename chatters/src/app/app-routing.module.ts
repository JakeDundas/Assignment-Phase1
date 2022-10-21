import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { NewGroupsComponent } from './new-groups/new-groups.component';
import { ProfileComponent } from './profile/profile.component';
import { NewUsersComponent } from './new-users/new-users.component';

const routes: Routes = [{path: '', component: NewGroupsComponent},
                        {path: 'groups', component: NewGroupsComponent},
                        {path: 'chat/:groupId', component: NewChatComponent},
                        {path: 'users', component: NewUsersComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'profile', component: ProfileComponent},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
