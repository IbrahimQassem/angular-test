import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import * as firebase from 'firebase';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
};

declare var jQuery: any;
@Component({
  selector: 'ms-chat',
  templateUrl: './chat-component.html',
  styleUrls: ['./chat-component.css'],
  encapsulation: ViewEncapsulation.None,
  //  host: {
  //   "[@fadeInAnimation]": 'true'
  // },
  // animations: [ fadeInAnimation ]
})
export class ChatComponent implements OnInit {

  // MESSAGE
  selectedChat: any;
  chats = [];
  // chats: Object[] = [{
  //   from: 'Bobby Sullivan',
  //   photo: 'assets/img/person.png',
  //   subject: 'Refferal Module'
  // },
  // {
  //   from: 'Doris Baker',
  //   photo: 'assets/img/person.png',
  //   subject: 'Best Deals',
  // }
  // ];

  messages: Object[] = [{
    from: 'them',
    msg: 'Need help in Refferal Module',
    time: '5 min ago'
  }, {
    from: 'me',
    msg: 'What kind of issue you faced?',
    time: '4 min ago'
  }, {
    from: 'them',
    msg: 'By refferal invite, my friend not get refferal offer',
    time: '2 min ago'
  }, {
    from: 'them',
    msg: 'and I have not received any notification',
    time: '2 min ago'
  }
  ];
  newMessage: string;
  // send() {
  //   if (this.newMessage) {
  //     this.messages.push({
  //       msg: this.newMessage,
  //       from: 'me',
  //       time: 'now'
  //     });
  //     this.newMessage = '';
  //   }
  //   setTimeout(function () { jQuery('#newid').scrollTop(10000); }, 500);
  // }

  async send() {
    debugger
    if (this.newMessage.trim() === '' || !this.selectedChat?.nickname) {
      return;
    }

    try {
      const priv_chat = { roomname: '', from: '', message: '', state: true, type: '', timeSent: '' };
      priv_chat.roomname = this.priv_roomname;
      priv_chat.from = this.nickname;
      priv_chat.message = this.newMessage;
      priv_chat.type = 'message';
      priv_chat.timeSent = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
      const newMessage = firebase.database().ref('private_room/' + priv_chat.roomname).push();
      newMessage.set(priv_chat);
      this.newMessage = '';
      window.scrollTo(0, document.body.scrollHeight);

      // window.scrollTo(this.scrolltop,0);
    } catch (err) {
      console.log(err);
    }
    // setTimeout(function () { jQuery('#newid').scrollTop(10000); }, 500);
  }

  clearMessages() {
    this.chats.length = 0;
  }

  users = [];
  nickname = '';
  priv_roomname = '';

  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;

  constructor(public datepipe: DatePipe, private router: Router) {
    this.nickname = localStorage.getItem('nickname');
    // this.selectedChat = this.chats[1];
    firebase.database().ref('users/').on('value', (resp2: any) => {
      const users = snapshotToArray(resp2);
      // this.users = users.filter(x => x.status === 'online' && x.nickname !== this.nickname);
      this.users = users.filter(x => x.nickname !== this.nickname);
    });
  }

  ngOnInit() {
    debugger;

    this.selectedChat = Object.assign({}, { imgProfile: "assets/img/noavatar.png" });
  }

  initPrivateChat() {
    debugger
    // const  node_name = use.nickname +'_'+ 'admin';  
    //  this.roomname = this.route.snapshot.params.roomname;
    firebase.database().ref('private_room/' + this.priv_roomname).on('value', resp => {
      this.chats = [];
      const ch = snapshotToArray(resp);
      this.chats = ch.filter(c => c.roomname === this.priv_roomname);
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });


  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  ref = firebase.database().ref('private_room/');
  // ref1 = firebase.database().ref('private_room/');
  // ref2 = firebase.database().ref('private_room/');
  onSelect(chat: Object[]): void {
    debugger
    if (!this.nickname) {

      alert("يجب عليك تسجيل الدخول !")
      return;
    }
    this.selectedChat = chat;


    this.priv_roomname = this.setOneToOneChat(this.nickname, this.selectedChat.nickname);;
    this.ref.child(this.priv_roomname).once('value', (snapshot: any) => {

      if (snapshot.exists()) {
        //  this.snackBar.open('Room name already exist!');
        console.log('Room name already exist!');
        this.initPrivateChat();

      } else {
        //  this.snackBar.open('No Room chat yeat!');
        try {
          const priv_chat = { roomname: '', from: '', message: '', state: true, type: '', timeSent: '' };
          priv_chat.roomname = this.priv_roomname;
          priv_chat.from = this.nickname;
          priv_chat.message = 'Start Chat With ' + this.selectedChat.nickname;
          priv_chat.type = 'message';
          priv_chat.timeSent = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
          const newMessage = firebase.database().ref('private_room').child(priv_chat.roomname).push();
          newMessage.set(priv_chat);
          this.initPrivateChat();
        } catch (err) {
          console.log(err);
        }

      }
    });

  }

  logout(): void {
    // firebase.database().ref('users/').orderByChild('roomname').equalTo(this.priv_roomname).on('value', (resp: any) => {
    //   let roomuser = [];
    //   roomuser = snapshotToArray(resp);
    //   const user = roomuser.find(x => x.nickname === this.nickname);
    //   if (user !== undefined) {
    //     const userRef = firebase.database().ref('roomusers/' + user.key);
    //     userRef.update({ status: 'offline' });
    //   }
    // });

    localStorage.removeItem('nickname');
    this.router.navigate(['/login']);
  }

  login(): void {
    if (!this.nickname) {
      this.router.navigate(['/login']);
    }
  }

  /**Function setsup endpoint for one to one chat**/
  setOneToOneChat(uid1, uid2) {
    //Check if user1’s id is less than user2's
    let tid1 = uid1.trim().length;
    let tid2 = uid2.trim().length;
    if (tid1 < tid2) {
      return uid1 + uid2;
    }
    else {
      return uid2 + uid1;
    }

  }

}



