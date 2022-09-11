import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGroupsComponent } from './chat-groups/chat-groups.component';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{path: '', component: ChatGroupsComponent},
                        {path: 'groups', component: ChatGroupsComponent},
                        {path: 'chat', component: ChatComponent},
                        {path: 'chat/:groupId', component: ChatComponent},
                        {path: 'users', component: UsersComponent},
                        {path: 'login', component: LoginComponent},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
