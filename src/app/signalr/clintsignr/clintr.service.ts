import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClintrService {

  private hubConnection: signalR.HubConnection;
  clintReceived = new EventEmitter<any>();

 

 constructor(private http: HttpClient) {
    debugger
    this.buildConnection();
    this.startConnection();
  }

  private buildConnection = () => {
    debugger

 
    this.hubConnection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("http://localhost:51993/signalr/hubs", {
      skipNegotiation: true,
      // transport: signalR.HttpTransportType.WebSockets
    })
    .build();

    // this.hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl("http://localhost:51993/signalr/hubs") //use your api adress here and make sure you use right hub name.
    //   .build();

      // var connection = new signalR.HubConnectionBuilder()
      // .withUrl("/chatHub")
      // .withHubProtocol(new signalR.protocols.msgpack.MessagePackHubProtocol())
      // .build();
  };

  private startConnection = () => {
    debugger
    this.hubConnection
      .start()
      .then(() => {
        console.log("Connection Started...");
       this.registerSignalEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);
        //if you get error try to start connection again after 3 seconds.
        // setTimeout(function () { this.startConnection(); }, 5000);
      });
  };

  private registerSignalEvents() {
    this.hubConnection.on("ContosoChatHub ", (data: any) => {
      this.clintReceived.emit(data);
    });
  }


  /* Http */
  Query(table: string): Observable<any> {
    const url1 = apiUrl() + `${table}`;
    return this.http.get<any>(url1)
      .pipe(res => { var obj_no = res; return obj_no; });
  }

  PostQuery(path, data): Observable<any> {
    let API_URL = `${apiUrl() + path} `;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.error)
      )
  }

   // Handle Errors 
   error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}

export function apiUrl(): string {
  if (environment.production)
    return 'https://localhost:44338/'
  return 'https://localhost:44338/';
 } 
 