import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

export class Credentials{
  username!:string;
  password!:string;
  constructor(username:string,password:string){
    this.username=username;
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
  loginForm!:NgForm;
  credentials!:Credentials;

  constructor() {
    this.credentials=new Credentials("ashok", "123");
  }

  ngOnInit(): void {

  }
  login(loginForm:NgForm):void{
    console.log("Logging called");
    console.log(loginForm.value);
    console.log("Credentials : ", this.credentials);
  }

}
