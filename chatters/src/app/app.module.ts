import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatGroupsComponent } from './chat-groups/chat-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatMainComponent,
    ChatGroupsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
