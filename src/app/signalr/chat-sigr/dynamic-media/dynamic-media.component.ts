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


  /*  media */
  @ViewChild('myVideo') myVideo: ElementRef; // Prior to Angular 8

  playVideo() {
    /**
     * You are accessing a dom element directly here,
     * so you need to call "nativeElement" first.
     */
    this.myVideo.nativeElement.pause();
    //  this.myVideo.nativeElement.play();
  }


}
