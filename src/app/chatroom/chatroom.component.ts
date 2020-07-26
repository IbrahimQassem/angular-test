import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;

  chatForm: FormGroup;
  nickname = '';
  roomname = '';
  priv_roomname = '';
  message = '';
  users = [];
  chats = [];
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe) {
    debugger
    this.nickname = localStorage.getItem('nickname');
    this.roomname = this.route.snapshot.params.roomname;
    firebase.database().ref('chats/').on('value', resp => {
      this.chats = [];
      const ch = snapshotToArray(resp);
      this.chats = ch.filter(c => c.roomname == this.roomname)
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });
    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
      const roomusers = snapshotToArray(resp2);
      this.users = roomusers.filter(x => x.status === 'online' && x.nickname !== this.nickname);
    });
    this.initPrivateChat();
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    debugger
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      'message': [null, Validators.required]
    });
  }

  exitChat() {
    // const chat = { roomname: '', nickname: '', message: '', date: '', type: '' };
    // chat.roomname = this.roomname;
    // chat.nickname = this.nickname;
    // chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    // chat.message = `${this.nickname} leave the room`;
    // chat.type = 'exit';
    // const newMessage = firebase.database().ref('chats/').push();
    // newMessage.set(chat);

    firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp: any) => {
      let roomuser = [];
      roomuser = snapshotToArray(resp);
      const user = roomuser.find(x => x.nickname === this.nickname);
      if (user !== undefined) {
        const userRef = firebase.database().ref('roomusers/' + user.key);
        userRef.update({ status: 'offline' });
      }
    });

    this.router.navigate(['/roomlist']);
  }

  /*  */
  photo: 'assets/img/person.png';
  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  ref = firebase.database().ref('private_room/');
  onSelect(user: any): void {
    // this.initPrivateChat();
    // return;
    debugger
    // const  node_name = user.nickname +'_'+ 'admin';  
    // const  node_name = user.nickname +'_'+ 'user';  
    const node_name = user.nickname + '_' + this.nickname;
    const priv_chat = { roomname: '', from: '', message: '', state: true, type: '', timeSent: '' };
    priv_chat.roomname = node_name;
    priv_chat.from = user.nickname;
    priv_chat.message = "Message From " + priv_chat.from;
    priv_chat.type = 'message';
    priv_chat.timeSent = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    this.ref.orderByChild('private_room').equalTo(node_name).once('value', (snapshot: any) => {
      if (snapshot.exists()) {
        //  this.snackBar.open('Room name already exist!');
        console.log('Room name already exist!');
      } else {
        const newRoom = firebase.database().ref('private_room/' + node_name).push();
        newRoom.set(priv_chat);
        //  this.router.navigate(['/roomlist']);
        // this.priv_roomname = 'Admin_admin';
        this.priv_roomname = node_name;
        this.initPrivateChat();

      }
    });
  }

  initPrivateChat() {
    debugger
    // const  node_name = use.nickname +'_'+ 'admin';  
    //  this.roomname = this.route.snapshot.params.roomname;
    firebase.database().ref('private_room/' + this.priv_roomname).on('value', resp => {
      this.chats = [];
      const ch = snapshotToArray(resp);
      this.chats = ch.filter(c => c.roomname === this.priv_roomname)
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });
    // firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(this.roomname).on('value', (resp2: any) => {
    //   const roomusers = snapshotToArray(resp2);
    //   this.users = roomusers.filter(x => x.status === 'online');
    // });

  }

  clearMessages() {
    // this.messages.length = 0;
  }



  async send(form: any) {
    debugger
    if (this.message.trim() === '') {
      return;
    }

    try {
      const chat = form;
      chat.roomname = this.roomname;
      chat.nickname = this.nickname;
      chat.date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      chat.type = 'message';
      const newMessage = firebase.database().ref('chats/').push();
      newMessage.set(chat);
      this.message = '';
    } catch (err) {
      console.log(err);
    }
  }
}
