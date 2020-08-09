import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { HttpClient, HttpErrorResponse, HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { MS_CHAT, USER_TABLE } from './chat-models';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ChatSignRService {
  private hubConnection: signalR.HubConnection;
  private userhubConnect: signalR.HubConnection;

  chatReceived = new EventEmitter<MS_CHAT>();
  usersState = new EventEmitter<USER_TABLE>();

  constructor(private http: HttpClient) {
    this.buildConnection();
    this.startConnection();

    this.buildUserConnection();
    this.startUsersConnection();
  }


  private buildConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(apiUrl() + "ms_chat_hub")
      .build();
  };

  private startConnection = () => {
    this.hubConnection
      .start()
      .then(() => {
        // console.log("Connection Started...");
        this.registerSignalEvents();
      })
      .catch(err => {
        console.log("Error while starting connection: " + err);
      });
  };

  private registerSignalEvents() {
    this.hubConnection.on("MS_CHATMessageReceived", (data: MS_CHAT) => {
      this.chatReceived.emit(data);
    });
  }


  // Users Real Time Events
  private buildUserConnection = () => {
    this.userhubConnect = new signalR.HubConnectionBuilder()
      .withUrl(apiUrl() + "user_hub")
      .build();
  };

  private startUsersConnection = () => {
    this.userhubConnect.start().then(() => {
      //  console.log("Connection Started...");
      this.registerUsersEvents();
    }).catch(err => {
      console.log("Error while starting connection Signal R: " + err);
    });
  };

  private registerUsersEvents() {
    this.userhubConnect.on("USER_TABLEStateus", (data: any) => {
      this.usersState.emit(data);
    });
  }

  /* End Signal R */

  public initSignRChat() {
    return this.http.get(apiUrl() + "api/v1/chat/MS_CHAT");
  }


  Query(table: string): Observable<any> {
    const url1 = apiUrl() + `${table}`;
    return this.http.get<any>(url1)
      .pipe(res => { var obj_no = res; return obj_no; });
  }

  // Send Message
  PostQuery(path, data): Observable<any> {
    let API_URL = `${apiUrl() + path} `;
    return this.http.post(API_URL, data)
      .pipe(
        // catchError(this.error)
      )
  }

  DeleteQuery(path, key): Observable<any> {
    let __url = apiUrl() + path;
    const url = `${__url + key}`;
    return this.http.delete(url).pipe(
      // catchError(this.error)
    )
  }
  /*  upload to server */

    upload(path, formData) {
    let API_URL = `${apiUrl() + path} `;
    return this.http.post<any>(API_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });

  }


}

const Ip = 'http://localhost:5000/'; 
// const Ip = 'http://192.168.1.103:8009/';
// const Ip = 'http://ibrahimqassiem-001-site1.itempurl.com/AlshamelSignalr/';

export function apiUrl(): string {
  if (environment.production)
    return Ip;
  return Ip;
}

