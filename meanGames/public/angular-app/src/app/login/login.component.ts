import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

class Credentials{
  username:string;
  password:string;

  constructor(usename:string, password:string){
    this.username=usename;
    this.password=password;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


@ViewChild('loginForm')
loginForm!: NgForm;

  credentials!:Credentials;
  constructor() {
  this.credentials= new Credentials("Jack","123");
  }

  ngOnInit(): void {
    // this.loginForm.setValue(this.credentials);
    console.log((this.loginForm));
    setTimeout(()=>{
      this.loginForm.setValue(this.credentials);
    },0);

  }
  login(loginForm:NgForm):void{
    console.log("Logging called");
    console.log(loginForm.value);
    console.log("Credentials  ", this.credentials);

  }

}
