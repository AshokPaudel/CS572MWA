import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, Novel } from './novel-list/novel-list.component';

@Injectable({
  providedIn: 'root'
})
export class NovelsDataService {
  currentNovel!:Novel;
  constructor(private http:HttpClient) { }
  baseUrl:string = "http://localhost:3456/api"

  public getNovels():Observable<Novel[]>{
    console.log("I am at getNovels");
    const url:string= this.baseUrl+"/novel";
    return this.http.get<Novel[]>(url);

  }

  public saveCurrentNovel(novel:Novel){
    this.currentNovel=novel;
  }
  public getCurrentNovel(){
    return this.currentNovel;
  }

  public getNovelDetails(novelId:string):Observable<Novel>{
    const url:string= this.baseUrl+"/novel/"+novelId;
    return this.http.get<Novel>(url);
  }
  public deleteNovel(novelId:Novel):Observable<any>{
    const url:string= this.baseUrl+"/novel/"+novelId;
    return this.http.delete<Novel>(url);
  }
  public addNovel(novel:Novel):Observable<any>{
    const body = JSON.stringify(novel);
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    console.log("Novel dataservice called to add novel ", body);
    const url:string = this.baseUrl+"/novel";
    return this.http.post(url,novel, {headers: header});
  }

  public editNovel(novelID:string,novel:Novel):Observable<any>{
    console.log("request from editNovel ", novelID,novel);
    const body = JSON.stringify(novel);
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    console.log("Novel dataservice called to add novel ", body);
    const url:string=this.baseUrl+"/novel/"+novelID;
    return this.http.put(url,novel, {headers: header});
  }

  public getAuthor(novelId:string,authorId:string):Observable<any>{
    const url=this.baseUrl+"/novel/"+novelId+"/authors/"+authorId;
    console.log("UrL at getAuthor",url)
    return this.http.get(url);
  }

  public deleteAuthor(novelId:string, authorId:string):Observable<any>{
    const url=this.baseUrl+"/novel/"+novelId+"/authors/"+authorId;
    console.log("UrL at Delete",url)
    return this.http.delete(url);
  }

  public editAuthor(novelId:string, authorId:string, author:Author):Observable<any>{
    const url=this.baseUrl+"/novel/"+novelId+"/authors/"+authorId;
    console.log("UrL at Edit Author",url);
    const header = new HttpHeaders();
    const body =JSON.stringify(author);
    console.log("body at edit author", body);
    header.set('Content-Type', 'application/json');
    return this.http.put(url,author,{headers: header});
  }
  public addAuthor(novelId:string, author:Author):Observable<any>{
    const url=this.baseUrl+"/novel/"+novelId+"/authors";
    console.log("UrL at Add Author",url);
    const header = new HttpHeaders();
    const body =JSON.stringify(author);
    console.log("body at ADd author", body);
    header.set('Content-Type', 'application/json');
    return this.http.post(url,author,{headers: header});
  }


}
