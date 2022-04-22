import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';


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

  @Output()
  emitFlag=new EventEmitter<boolean>();

  #username!:string ;
  loginFlag!:boolean;
  // =this.authenticateService.isLoggedIn;
  // set username(username){this.#username=username};
  get username(){
    return this.#username;
  }

  constructor(private userDataService:UserDataService, private authenticateService:AuthenticationService,private router :Router) {
    // this.credentials=new Credentials("ashok", "123");
  }

  ngOnInit(): void {

    if(this.authenticateService.getToken()){
      this.authenticateService.isLoggedIn=true;
      this.authenticateService.setUsername();
      this.#username=this.authenticateService.username;
    }
    this.loginFlag=this.authenticateService.isLoggedIn;

  }
  login(loginForm:NgForm):void{
    console.log("Logging called");
    console.log(loginForm.value);
    console.log("Credentials : ", this.credentials);
    if(loginForm.value.username&& loginForm.value.password){
    this.credentials=new Credentials(loginForm.value.username, loginForm.value.password);

    this.userDataService.login(this.credentials).subscribe({
      next:(loginResponse)=>{
        console.log(loginResponse);
        this.emitFlag.emit(true);
        this.authenticateService.isLoggedIn=true;
        this.authenticateService.saveToken(loginResponse.token);
        this.authenticateService.setUsername();
        this.#username=this.authenticateService.username;
        this.loginFlag=this.authenticateService.isLoggedIn;
        this.router.navigate(["/"]);
      },
      error:err=>{
        console.log(" Login failed ", err);
        window.alert("User Name and password must be valid");
      },
      complete:()=>console.log(" Done"),
    })
  }else{
    // window.alert("User Name and password required");
  }

  }
  logout(){
    console.log("Log out requested");
    this.emitFlag.emit(false);
    this.authenticateService.isLoggedIn=false;
    this.loginFlag=false;
    this.authenticateService.removeToken();

  }

}
