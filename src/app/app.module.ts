import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {  MyOwnCustomMaterialModule } from './shared/material.module';
import { ChatComponent } from './chat/chat.component';
import { AddeditUserComponent } from './addedit-user/addedit-user.component';
import { SqlsignalrComponent } from './signalr/sqlsignalr/sqlsignalr.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatSigrComponent } from './signalr/chat-sigr/chat-sigr.component';
 import { ClintsignrComponent } from './signalr/clintsignr/clintsignr.component';
import { UploadFileComponent } from './signalr/chat-sigr/upload-file/upload-file.component';
import { DragDropDirective } from './signalr/chat-sigr/upload-file/drag-drop.directive';
 import { DynamicMediaComponent } from './signalr/chat-sigr/dynamic-media/dynamic-media.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomlistComponent,
    AddroomComponent,
    ChatroomComponent,
    ChatComponent, 
    AddeditUserComponent,
    SqlsignalrComponent,
    ChatSigrComponent,
     ClintsignrComponent,
     UploadFileComponent,
     DragDropDirective,
     DynamicMediaComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule ,
      PerfectScrollbarModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DynamicMediaComponent]

})
export class AppModule { }
