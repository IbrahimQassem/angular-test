import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatComponent } from './chat/chat.component';
import { SqlsignalrComponent } from './signalr/sqlsignalr/sqlsignalr.component';
import { ChatSigrComponent } from './signalr/chat-sigr/chat-sigr.component';
import { ClintsignrComponent } from './signalr/clintsignr/clintsignr.component';



const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'sql', component: SqlsignalrComponent },
  { path: 'chatsql', component: ChatSigrComponent },
  { path: 'clint', component: ClintsignrComponent },
  { path: 'login', component: LoginComponent },
  { path: 'roomlist', component: RoomlistComponent },
  { path: 'addroom', component: AddroomComponent },
  { path: 'chatroom/:roomname', component: ChatroomComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
