import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { MS_CHAT, USER_TABLE, MSG_TYPE } from './chat-models';
import { ChatSignRService, apiUrl } from './chat-signr.service';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { HttpEventType, HttpRequest, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicMediaComponent } from './dynamic-media/dynamic-media.component';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'mat-ta-chat-sigr',
  templateUrl: './chat-sigr.component.html',
  styleUrls: ['./chat-sigr.component.css']
})
export class ChatSigrComponent implements OnInit {

  url: string = apiUrl();

  users: USER_TABLE[] = [
    // {
    //   USER_ID: 1,
    //   USER_UNIQNAME: 'User Dublicate',
    //   USER_IMG: 'assets/img/person.png',
    //   USER_ISONLINE: false,
    //   USER_LASTSEEN: new Date()
    // }
  ];

  chats: MS_CHAT[] = [
    // {
    //   MS_ID: 1,
    //   FUSER_ID: 1001,
    //   TUSER_ID: 1002,
    //   MS_TYPE: 1,
    //   MS_TEXT: "Hi Thire ",
    //   MS_STATE: true,
    //   MS_DATE: new Date()
  ];

  selectedChat: USER_TABLE;

  defoultUS: USER_TABLE = new USER_TABLE(
    // {
    //   USER_ID: 1,
    //   USER_UNIQNAME: 'المستخدم الإفتراضي',
    //   USER_IMG: 'https://picsum.photos/200/300?grayscale',
    //   USER_ISONLINE: true
    // }
  );
  newMessage: string;

  model: Array<MS_CHAT> = new Array();

  msgType = MSG_TYPE;

  // Aouto Scrolling
  @ViewChild('perfectScroll') perfectScroll: PerfectScrollbarComponent;



  constructor(private chatRService: ChatSignRService, private router: Router, private http: HttpClient, private resolver: ComponentFactoryResolver) {

    this.defoultUS = JSON.parse(localStorage.getItem('user'));
    if (!this.defoultUS) {
      this.router.navigate(['/login']);
      return;
    } else {
      this.chatRService.Query('api/v1/userlist/user').subscribe((data: any[]) => {
        this.users = [];
        this.users = data;
        let id: number = this.defoultUS.USER_ID;
        this.users = this.users.filter(x => x.USER_ID !== id);
      });
    }



  }



  ngOnInit(): void {
    this.chats = [];
    this.chatRService.chatReceived.subscribe((signal: MS_CHAT) => {
      this.scrollToBottom();
      this.chats.push(signal);
    });

    // this.chatRService.usersState.subscribe((signal: USER_TABLE) => {
    //   this.users.push(signal);
    //   let id:number = this.defoultUS.USER_ID;
    //       this.users = this.users.filter(x => x.USER_ID !== id  );
    // });

  }




  onSelect(chat: USER_TABLE): void {

    if (!this.defoultUS.USER_UNIQNAME) {
      alert("يجب عليك تسجيل الدخول !")
      return;
    }

    this.selectedChat = chat;
    this.fileList = [];
    if (!this.defoultUS.USER_ID && !this.selectedChat.USER_ID) {
      alert("رقم المستخدم أو رقم الستقبل غير موجود !")
      return;
    }

    let query = `api/v1/chat/MS_CHATWITH?FUSER_ID=${+this.defoultUS.USER_ID}&TUSER_ID=${+this.selectedChat.USER_ID}`;
    this.chatRService.Query(query).subscribe((data: any[]) => {
      this.chats = data;
    })

  }



  async send() {
    if (!this.selectedChat) {
      alert("يجب تحديد المستلم !");
      return false;
    }

    try {
      let modelMSG: MS_CHAT = new MS_CHAT();
      modelMSG.FUSER_ID = this.defoultUS.USER_ID;
      modelMSG.TUSER_ID = this.selectedChat.USER_ID;
      modelMSG.MS_TYPE = this.msgType.MESSAGE;
      modelMSG.MS_TEXT = this.newMessage;
      modelMSG.MS_STATE = true;
      modelMSG.MS_DATE = new Date();

      // setTimeout(function () { jQuery('#newid').scrollTop(10000); }, 500);
      this.chatRService.PostQuery('api/v1/chat/MS_CHAT', modelMSG).subscribe(res => {
        if (res == true) {
          this.newMessage = '';
          this.scrollToBottom();

          return false;
        }
        alert("لم يتم الإرسال !");

      });

    } catch (err) {
      console.log(err);
    }

  }

  scrollToBottom() {
    this.perfectScroll.directiveRef.update(); //for update scroll
    this.perfectScroll.directiveRef.scrollToBottom(0, 500); //for update scroll
  }


  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  login(): void {
    // this.router.navigate(['']);
  }

  // Mute a singular HTML5 element
  muteMe(elem) {
    elem.muted = true;
    elem.pause();
  }

  // Try to mute all video and audio elements on the page
  mutePage() {
    document.querySelectorAll("video, audio").forEach(elem => this.muteMe(elem));
  }
  mute(): void {

    Array.prototype.slice.call(document.querySelectorAll("video, audio")).forEach(function (audio) {
      audio.pause();
      audio.muted = true;
    });

    // let audios = [document.getElementsByTagName('audio')];
    // audios.forEach(audio => audio.volume = 0.5) // lower volume 50%.
    // var elems = document.querySelectorAll("video, audio");
    // [].forEach.call(elems, function(elem) { this.muteMe(elem); });
  }

  clearMessages() {
     if (this.selectedChat === undefined) {
      alert("لم يتم تحديد المحادثة !")
      return false;
    }
    let query = `?FUSER_ID=${+this.defoultUS.USER_ID}&TUSER_ID=${+this.selectedChat.USER_ID}`;
    // let query = `FUSER_ID=${+this.defoultUS.USER_ID},TUSER_ID=${+this.selectedChat.USER_ID}`;
    this.chatRService.DeleteQuery('api/v1/chat/MS_CHAT', query).subscribe((data: any[]) => {

      this.chats = data;
      // this.chats.length = 0;
    })
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }


  /*   */

  // file: any;
  fileList: any[] = [];

  imageSrc: any = new Array<string | ArrayBuffer>();
  chatList: MS_CHAT[] = [];
  formData = new FormData();
  onSelectFile($event, file) {
     this.fileList = file;
    if (this.fileList.length > 0) {
      const file = this.fileList[0];
      /* Get File Extansion */
      if (this.getFileExtension(file.name) == undefined) {
        alert("إمتداد الملف غير مقبول !");
        return false;
      }

      for (let file of this.fileList) {
        this.formData.append('files', file);
        //  Object.keys(model).forEach(key => this.formData.append(key, this.chatList);
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }

    }

  }

  deleteAttachment(item, index) {
    // this.fileList.splice(index, 1)
    var itemsArray = Array.from(this.fileList);
    this.fileList = itemsArray.filter(e => e !== item);
  }



  sendFileChat() {
    if (this.fileList.length === 0) {
      return;
    }

    const formData = new FormData();

    for (let file of this.fileList) {
      formData.append('files', file);
      formData.append('FUSER_ID', "" + this.defoultUS.USER_ID);
      formData.append('TUSER_ID', "" + this.selectedChat.USER_ID);
      formData.append('MS_TYPE', "" + this.getFileExtension(file.name) || "5");
    }

    const endpoint = apiUrl() + 'api/v1/chat/MS_FILE';
    const uploadReq = new HttpRequest('POST', endpoint, formData, {
      reportProgress: true,
    });

    this.chatRService.upload('api/v1/chat/MS_FILE', formData).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            // file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // file.inProgress = false;
        let file;
        return of(`Upload failed: ${file}`);
      })).subscribe((event: any) => {
        if (typeof (event) === 'object') {
          // console.log(event.body);
          this.fileList = [];
          alert("تم الإرسال بنجاح .");
        }
      });

    // this.http.request(uploadReq).subscribe((event: any) => {
     //   if (event.ok) {
    //     this.fileList = [];
    //     alert("تم الإرسال بنجاح .");
    //    }
    // });

  }


  getFileExtension(filename) {
    /*TODO*/
    // return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    // return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
    let extansion = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;

    if (extansion) {
      switch (extansion) {
        case 'jpg': case 'gif': case 'jpeg': case 'png': return this.msgType.IMAGE; break;
        case 'mp3': return this.msgType.AUDIO; break;
        case 'mp4': return this.msgType.VIDEO; break;
        case 'txt': case 'doc': case 'docx': case 'pdf': return this.msgType.DOCUMENT; break;
        default: return undefined; break;
      }
    } else {
      return undefined;
    }
  }

}

