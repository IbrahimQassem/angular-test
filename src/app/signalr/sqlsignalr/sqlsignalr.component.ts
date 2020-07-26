import { Component, OnInit } from '@angular/core';
import { SignalViewModel } from 'src/app/models/models';
import { SignalRService } from './signal-r.service';

@Component({
  selector: 'mat-ta-sqlsignalr',
  templateUrl: './sqlsignalr.component.html',
  styleUrls: ['./sqlsignalr.component.css']
})
export class SqlsignalrComponent implements OnInit {

  signalList: Array<SignalViewModel> = new Array();

  constructor(private signalRService: SignalRService) {
 
    this.signalRService.initSignRChat().subscribe((data: any[])=>{
      debugger
      console.log(data);
    })  
  }

  ngOnInit() {
    debugger
    this.signalRService.signalReceived.subscribe((signal: SignalViewModel) => {
      this.signalList.push(signal);
      console.log(signal);
     });

     let obj: SignalViewModel =  {
      id: 0,
      description: "Temp Data",
      customerName: "Temp CustomerName",
      accessCode: "Temp AccessCode",
      area: "Area",
      zone: "Zone",
      signalDate: "2020-07-15T04:22:25.737"
  }
     this.signalList.push(obj);
  }

}
