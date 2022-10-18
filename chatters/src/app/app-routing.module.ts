import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { NewGroupsComponent } from './new-groups/new-groups.component';

const routes: Routes = [{path: '', component: NewGroupsComponent},
                        {path: 'groups', component: NewGroupsComponent},
                        {path: 'chat/:groupId', component: NewChatComponent},
                        {path: 'users', component: UsersComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'new', component: NewChatComponent},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
