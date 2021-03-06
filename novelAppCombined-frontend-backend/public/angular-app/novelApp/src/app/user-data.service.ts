import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from './login/login.component';
import { Token } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private httpClient:HttpClient) { }


  registerUser(credentials:Credentials):Observable<Credentials>{
   const url = environment.API_URL+ environment.USER_URL;
   const header = new HttpHeaders();
   console.log("At register User method of service ");

   return this.httpClient.post<Credentials>(url,credentials);
  }

  login(credentials:Credentials):Observable<Token>{
    const url = environment.API_URL+ environment.USER_LOGIN;
    return this.httpClient.post<Token>(url,credentials);
  }
}
