import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDataService } from '../user-data.service';

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

  constructor(private userDataService:UserDataService) {
    // this.credentials=new Credentials("ashok", "123");
  }

  ngOnInit(): void {

  }
  login(loginForm:NgForm):void{
    console.log("Logging called");
    console.log(loginForm.value);
    console.log("Credentials : ", this.credentials);
    this.credentials=new Credentials(loginForm.value.username, loginForm.value.password);

    this.userDataService.login(this.credentials).subscribe({
      next:success=>console.log(" Login Success ", success),
      error:err=>console.log(" Login failed ", err),
      complete:()=>console.log(" Done"),
    })

  }

}
