import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { apiUrl } from './signalr/clintsignr/clintr.service';

const config = {
  apiKey: 'AAAA_tWJt1g:APA91bGqGdSgun-WfA6LB0UsHhuGE-9lFhKfTLBWi8JYtGMOjydQpN2eo3Wbi84Wrd_zWCq7iGZOLeFsB0ZrHLjehhky7zTDMsarJzdQRHKSTSiPMkWcYKpKdirjifI6KAUIQoBJknRs',
  databaseURL: "https://yemensys-abe75.firebaseio.com"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-chat';

  constructor() {
    firebase.initializeApp(config);

    // let obj = {url : apiUrl()};
    //  localStorage.setItem('url',JSON.stringify(obj));
 
  }
}
