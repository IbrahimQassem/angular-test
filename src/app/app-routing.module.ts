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
import { LockscreenComponent } from './lockscreen/lockscreen.component';

 

const routesX: Routes = [{
  path: '',
  component: LoginComponent,
  children: [
   {
      path: '',
      redirectTo: 'login',
      pathMatch: 'prefix'
   },
   {
      path: 'login',
      component: LoginComponent
   }
   ,
   {
      path: 'chat',
      component: ChatSigrComponent
   }
 ]
}];

const routes: Routes = [
  // { path: 'chat', component: ChatComponent },
  // { path: 'sql', component: SqlsignalrComponent },
  { path: 'chat', component: ChatSigrComponent },
  // { path: 'clint', component: ClintsignrComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'roomlist', component: RoomlistComponent },
  // { path: 'addroom', component: AddroomComponent },
  // { path: 'chatroom/:roomname', component: ChatroomComponent },
  // {	path: 'lockscreen',  component: LockscreenComponent,},
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
