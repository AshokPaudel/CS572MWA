import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginFlag!:boolean;
  // loginFlag:boolean=false;
  // =this.authenticateService.isLoggedIn;

  constructor(private authenticateService: AuthenticationService) { }

  ngOnInit(): void {
    console.log("At navts",this.authenticateService.isLoggedIn);
    this.loginFlag=this.authenticateService.isLoggedIn;
  }
  setLoginFlag(loginFlag:boolean){
    console.log("login ", loginFlag);
    this.loginFlag=loginFlag;
  }



}
