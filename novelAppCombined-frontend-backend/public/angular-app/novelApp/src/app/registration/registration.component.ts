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
  get isLoggedIn(){
    return this.#isLoggenIn;
  }

  constructor(private userDataService:UserDataService, private authticationService:AuthenticationService) { }


  ngOnInit(): void {
  }

//   validatePassword(): ValidatorFn {
//     return (control: AbstractControl) => {
//          let isValid = false;
//          if (control && control instanceof FormGroup) {
//             let group = control as FormGroup;
//             if (group.controls['password'] && group.controls['repeatPassword']) {
//               isValid = group.controls['password'].value == group.controls['repeatPassword'].value;
//             }
//           }
//          if (isValid) {
//             return null;
//          } else {
//             return { 'passwordCheck': 'failed'}
//          }
//     }
//  }

// public ConfirmedValidator(controlName: string, matchingControlName: string){

//   return (formGroup: FormGroup) => {

//       const control = formGroup.controls[controlName];

//       const matchingControl = formGroup.controls[matchingControlName];

//       if (control.value !== matchingControl.value) {

//           matchingControl.setErrors({ confirmedValidator: true });

//       } else {

//           matchingControl.setErrors(null);

//       }

//   }

// }

  register(registrationForm:NgForm){
    console.log("login value ", registrationForm.value);
    // console.log( registrationForm);
    console.log( registrationForm.value);
    // console.log(this.validatePassword());
    this.credentials=new Credentials(registrationForm.value.username, registrationForm.value.passwords.password);
    console.log(this.credentials);
    this.userDataService.registerUser(this.credentials).subscribe({
      next:user=>console.log("User registered ", user),
      error:err=>console.log("Error registering user ",err),
      complete:()=>console.log("done")
    });

  }

}
