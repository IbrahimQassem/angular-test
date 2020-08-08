import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MSG_TYPE, MS_CHAT } from '../chat-models';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'dynamicMedia',
  templateUrl: './dynamic-media.component.html',
})
export class DynamicMediaComponent implements OnInit {


  @Input() url: string;
  @Input() chat: MS_CHAT = new MS_CHAT();
  msgType = MSG_TYPE;


  constructor() { }

  ngOnInit(): void {
  }


  /*  download fils */
  downloadPdf(pdfUrl: string, pdfName: string) {
    debugger
    //const pdfUrl = './assets/sample.pdf';
    //const pdfName = 'your_pdf_file';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  openDoc(pdfUrl: string, startPage: number) {
    window.open(pdfUrl + '#page=' + startPage, '_blank', '', true);
  }


  @ViewChild('videoEl') videoElRef: ElementRef;
  get video(): HTMLVideoElement {
    return this.videoElRef.nativeElement;
  }

  onPlay() {
    this.video.play();
  }

  onPause() {
    this.video.pause();
  }
  toggleVideo() {
    debugger

    // var myVideo: any = document.getElementById("my_video_1");
    // if (myVideo.paused)
    //  myVideo.play();
    // else myVideo.pause();
    // Array.prototype.slice.call(document.querySelectorAll("video, audio")).forEach(function (audio) {
    //   audio.pause();
    //  });
    // this.onPlay();
    // this.videoElRef.nativeElement.play();
    // this.videoElRef.nativeElement?this.onPlay():this.onPause();
    // if (this.video.paused) {
    //   this.onPlay();
    // } else {
    //   this.onPause();
    // }
  }
  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }
}
