import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

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

  #username!:string ;
  #isLoggedIn:boolean=false;
  // set username(username){this.#username=username};
  get username(){
    return this.#username;
  }
  get isLoggedIn(){
    return this.#isLoggedIn;
  }

  constructor(private userDataService:UserDataService, private authenticateService:AuthenticationService, private _jwtHelper:JwtHelperService) {
    // this.credentials=new Credentials("ashok", "123");
  }

  ngOnInit(): void {
    this.#isLoggedIn=this.authenticateService.isLoggedIn;
  }
  login(loginForm:NgForm):void{
    console.log("Logging called");
    console.log(loginForm.value);
    console.log("Credentials : ", this.credentials);
    this.credentials=new Credentials(loginForm.value.username, loginForm.value.password);

    this.userDataService.login(this.credentials).subscribe({
      next:(loginResponse)=>{
        console.log(loginResponse);
        this.authenticateService.isLoggedIn=true;
        this.authenticateService.saveToken(loginResponse.token);
        this.authenticateService.setUsername();
        this.#isLoggedIn=this.authenticateService.isLoggedIn;
        this.#username=this.authenticateService.username;
      },
      error:err=>console.log(" Login failed ", err),
      complete:()=>console.log(" Done"),
    })

  }
  logout(){
    console.log("Log out requested");
    this.authenticateService.isLoggedIn=false;
    this.authenticateService.removeToken();

  }

}
