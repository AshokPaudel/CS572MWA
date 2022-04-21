import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Author, Novel } from './novel-list/novel-list.component';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NovelsDataService {

   currentNovel!:Novel;
  constructor(private http:HttpClient , private authenticateService:AuthenticationService ) { }
  baseUrl:string = environment.API_URL;

  public saveCurrentNovel(novel:Novel){
    this.currentNovel=novel;
  }
  public getCurrentNovel(){
    return this.currentNovel;
  }

  public getNovels():Observable<Novel[]>{
    const url:string= this.baseUrl+environment.NOVELS_PATH;
    return this.http.get<Novel[]>(url);

  }

  public getNovelDetails(novelId:string):Observable<Novel>{
    const url:string= this.baseUrl+environment.NOVELS_PATH+novelId;
    return this.http.get<Novel>(url);
  }
  public deleteNovel(novelId:Novel):Observable<Novel>{
    const url:string= this.baseUrl+environment.NOVELS_PATH+novelId;
    return this.http.delete<Novel>(url, {headers:this.getHeader()});
  }
  public addNovel(novel:Novel):Observable<Novel>{

    const url:string = this.baseUrl+environment.NOVELS_PATH;
    return this.http.post<Novel>(url,novel, {headers: this.getHeader()});
  }

  public editNovel(novelId:string,novel:Novel):Observable<Novel>{
    const url=this.baseUrl+environment.NOVELS_PATH+novelId
    return this.http.put<Novel>(url,novel, {headers: this.getHeader()});
  }

  public getAuthor(novelId:string,authorId:string):Observable<any>{
    const url=this.baseUrl+environment.NOVELS_PATH+novelId+environment.AUTHORS_PATH+authorId;
    return this.http.get(url);
  }

  public deleteAuthor(novelId:string, authorId:string):Observable<Author[]>{
    const url=this.baseUrl+environment.NOVELS_PATH+novelId+environment.AUTHORS_PATH+authorId;
    console.log("UrL at Delete",url)
    return this.http.delete<Author[]>(url,{headers: this.getHeader()});
  }

  public editAuthor(novelId:string, authorId:string, author:Author):Observable<any>{
    const url=this.baseUrl+environment.NOVELS_PATH+novelId+environment.AUTHORS_PATH+authorId;
    return this.http.put(url,author,{headers: this.getHeader()});
  }
  public addAuthor(novelId:string, author:Author):Observable<any>{
    const url=this.baseUrl+environment.NOVELS_PATH+novelId+environment.AUTHORS_PATH;
    return this.http.post(url,author,{headers: this.getHeader()});
  }
  public searchNovels(title:string):Observable<Novel[]>{
    console.log("Search Service");
    const url: string = this.baseUrl + environment.NOVELS_SEARCH + title;
    return this.http.get<Novel[]>(url);
  }

  getHeader(){
    return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.authenticateService.getToken()});
  }
}
