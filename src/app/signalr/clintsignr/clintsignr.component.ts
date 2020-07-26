import { Component, OnInit, NgZone } from '@angular/core';
import { ClintrService } from './clintr.service';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { SignalRService } from './signal-r.service';
import { GetClockTime } from 'src/app/core/app.service';

@Component({
  selector: 'mat-ta-clintsignr',
  templateUrl: './clintsignr.component.html',
  styleUrls: ['./clintsignr.component.css']
})
export class ClintsignrComponent implements OnInit {

  // public variables declaration  
  public currentMessage: GetClockTime;
  public allMessages: GetClockTime;
  public canSendMessage: Boolean;

  constructor(
    // private clintServ : ClintrService ,
    // private _signalRService: SignalRService,
    // private _ngZone: NgZone
  ) {

    // // this can subscribe for events  
    // this.subscribeToEvents();
    // // this can check for conenction exist or not.  
    // this.canSendMessage = _signalRService.connectionExists;
    // // this method call every second to tick and respone tansfered to client.  
    // setInterval(() => {
    //   this._signalRService.sendTime();
    // }, 1000);

  }

  // private subscribeToEvents(): void {
  //   // if connection exists it can call of method.  
  //   this._signalRService.connectionEstablished.subscribe(() => {
  //     this.canSendMessage = true;
  //   });
  //   // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
  //   this._signalRService.messageReceived.subscribe((message: GetClockTime) => {
  //     debugger;
  //     this._ngZone.run(() => {
  //       this.allMessages = message;
  //     });
  //   });
  // }

  private hubConnection: HubConnection;

  ngOnInit(): void {
    debugger

    //   this.hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl("https://localhost:44338/usersHub").build();

    // this.hubConnection.start().then(() => {
    //   console.log("connection started");
    // }).catch(err => console.log(err));

    // this.hubConnection.onclose(() => {
    //   debugger;
    //   setTimeout(() => {
    //     debugger;
    //     this.hubConnection.start().then(() => {
    //       debugger;
    //       console.log("connection started");
    //     }).catch(err => console.log(err));
    //   }, 5000);
    // });

    // this.hubConnection.on("refreshUserData", (data) => {
    //   debugger;
    //   console.log(data);
    // });

    // this.hubConnection.on("WelcomeMethodName", (data) => {
    //   debugger;
    //   console.log(data);
    //   this.hubConnection.invoke("GetDataFromClient", "user id", data).catch(err => console.log(err));
    // });
  }

  // stopConnection() {
  //   this.hubConnection.start().then(() => {
  //     console.log("stopped");
  //   }).catch(err => console.log(err));
  // }

  private hub: signalR.HubConnection;


  send() {

    debugger
    // this.clintServ.Query('api/todo/1').subscribe((data: any[]) => {
    //   debugger

    //   console.log(data);

    //   this.clintServ.clintReceived.subscribe((signal: any) => {
    //     debugger
    //     console.log(signal);
    //   });
    // });

    this.hub = new HubConnectionBuilder()
      .withUrl("https://localhost:44338/signalr")
      .configureLogging(LogLevel.Error)
      .build();

    this.hub.start().catch(err => console.error(err.toString()));


    this.hub.on("Send", (data) =>
      console.log(data));



  }


}
