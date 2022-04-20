import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import {Credentials} from '../login/login.component'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('registrationForm')
  registrationForm!:NgForm;
  credentials!:Credentials;

  constructor(private userDataService:UserDataService) { }


  ngOnInit(): void {
  }
  register(registrationForm:NgForm){
    console.log("login value ", registrationForm.value);
    this.credentials=new Credentials(registrationForm.value.username, registrationForm.value.password);
    this.userDataService.registerUser(this.credentials).subscribe({
      next:user=>console.log("User registered ", user),
      error:err=>console.log("Error registering user ",err),
      complete:()=>console.log("done")
    });

  }

}
