import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, NgForm, ValidatorFn } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import {Credentials} from '../login/login.component'
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('registrationForm')
  registrationForm!:NgForm;
  credentials!:Credentials;
  #isLoggenIn:boolean=this.authticationService.isLoggedIn;
  registerSuccess:boolean=false;
  registerFail:boolean=false
  get isLoggedIn(){
    return this.#isLoggenIn;
  }

  constructor(private userDataService:UserDataService, private authticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

  register(registrationForm:NgForm){
    console.log( registrationForm.value);
    if(this.validateForm(registrationForm)){
      console.log("Form validation success");
      this.credentials=new Credentials(registrationForm.value.username, registrationForm.value.password);
      console.log(this.credentials);
      this.userDataService.registerUser(this.credentials).subscribe({
        next:user=>{
          console.log("User registered ", user);
          this.registerSuccess=true;
        },
        error:err=>{
          console.log("Error registering user ",err);
          this.registerFail=true;
        },
        complete:()=>console.log("done")
      });
    }else{
      console.log("Form validation Failed");
      this.registerFail=true;
    }


  }

  validateForm(registrationForm:NgForm):boolean{
    if(!registrationForm.value.username || !registrationForm.value.password ||!registrationForm.value.repeatPassword) return false;
    return registrationForm.value.password ===registrationForm.value.repeatPassword;
  }
  reset(){
    this.registerFail=false;
    this.registerSuccess=false;
  }

}
