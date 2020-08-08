import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { USER_TABLE } from '../signalr/chat-sigr/chat-models';
 import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ChatSignRService } from '../signalr/chat-sigr/chat-signr.service';
import { MyErrorStateMatcher } from '../login/login.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mat-ta-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {
  
  loginForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private serv: ChatSignRService, private router: Router, public datepipe: DatePipe, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'USER_UNIQNAME': [null, Validators.required],
      'USER_PASS': [null, Validators.required]
    });
  }

  

  onFormSubmit(form: any) {
    //const clone = JSON.parse(JSON.stringify(form));
    debugger
    let model: USER_TABLE = new USER_TABLE();
    model.USER_UNIQNAME =  form.USER_UNIQNAME;
    model.USER_PASS = form.USER_PASS;
    model.USER_ISONLINE = true;

    this.serv.PostQuery('api/v1/userlist/login', model).subscribe(res => {
      if (res) {
        // res.USER_IMG = apiUrl()+res.USER_IMG;
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/chat']);
      }else{
        alert("خطأ في تسجيل الدخول !");
      }
    },err =>{
      alert(err.statusText+ " خطأ في تسجيل الدخول !");
    });

  }
}
