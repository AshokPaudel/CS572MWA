import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  #isLoggedIn: boolean = (localStorage.getItem(environment.TOKEN_STORAGE_KEY))!=null;
  #username:string="";

  public saveToken(token:string):void{
    localStorage.setItem(environment.TOKEN_STORAGE_KEY,token);

  }
  public getToken():string{
    return localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string;
  }
  public removeToken(){
    this.isLoggedIn=false;
    localStorage.clear();
  }
  setUsername(){
    const token:string=localStorage.getItem(environment.TOKEN_STORAGE_KEY) as string;
    this.#username=this._jwtHelper.decodeToken(token).username;
    console.log("Username is ", this.#username);
  }
  get username():string{
    return this.#username;
  }

  get isLoggedIn(){
    return this.#isLoggedIn;
  }
  set isLoggedIn(isLoggedIn){
    this.#isLoggedIn = isLoggedIn;
  }

  constructor( private _jwtHelper:JwtHelperService) { }

}
export class Token{
  #success!:boolean;
  #token!:string;
  set token(token:string){this.#token=token;}
  get token():string{return this.token};
  get success():boolean{return this.success};
  set success(success:boolean){this.success=success};
}
