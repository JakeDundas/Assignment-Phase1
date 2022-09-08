import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatGroupsComponent } from './chat-groups/chat-groups.component';

const routes: Routes = [{path: '', component: ChatMainComponent},
                        {path: 'groups', component: ChatGroupsComponent},
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
