import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!:FormGroup;
  // constructor() {
  //   this.registrationForm=new FormGroup({
  //     name: new FormControl("Jack"),
  //     username:new FormControl("jack"), //can have initial value
  //     password:new FormControl(),
  //     repeatPassword:new FormControl()
  //   })
  // }

  constructor(private formBuilder:FormBuilder){
    this.registrationForm= this.formBuilder.group({
      name:"Jack",
      username:"jack",
      password:"password",
      repeatPassword:"repeatPassword"
    })
  }

  ngOnInit(): void {

  }
  register(registrationForm:FormGroup){
    console.log("Form submitted");

    console.log(registrationForm.value.name);
  }

}
