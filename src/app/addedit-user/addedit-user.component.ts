import { Component, Inject, Optional, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'mat-ta-addedit-user',
  templateUrl: './addedit-user.component.html',
  styleUrls: ['./addedit-user.component.css']
})
export class AddeditUserComponent implements OnInit {

  action: string;
  model: LENGTH;
  loading: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<AddeditUserComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data);
    debugger
     this.model = data;
    this.action = data.action;
  }
  ngOnInit(): void {
   }

  doAction() {
    debugger
    
    // if (!this.model.L_ARNAME) {
    //   this.ClassHelper.Alert("L_TITLE_ISREQ", MsgType.Error);
    //   return false
    // } 
   

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close({ event: this.action, data: this.model });
    }, 3000);

  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}



export class LENGTH {
  constructor() { }
  L_ID: number = 0;
  L_NO?: string = null;
  L_ARNAME: string = null;
  L_ENNAME?: string = null;
  L_VALUE: any = null;
  L_UNIT: string = null;
  L_ENABLED: boolean = false;
}
