import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { LoginComponent } from './login/login.component';
import { NewChatComponent } from './new-chat/new-chat.component';
import { NewNavbarComponent } from './new-navbar/new-navbar.component';
import { NewGroupsComponent } from './new-groups/new-groups.component';
import { ProfileComponent } from './profile/profile.component';
import { FloatingVideoComponent } from './floating-video/floating-video.component';
import { NewUsersComponent } from './new-users/new-users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewChatComponent,
    NewNavbarComponent,
    NewGroupsComponent,
    ProfileComponent,
    FloatingVideoComponent,
    NewUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
