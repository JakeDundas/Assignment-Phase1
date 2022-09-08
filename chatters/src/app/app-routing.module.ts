import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatGroupsComponent } from './chat-groups/chat-groups.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{path: '', component: ChatGroupsComponent},
                        {path: 'groups', component: ChatGroupsComponent},
                        {path: 'chat', component: ChatComponent},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
