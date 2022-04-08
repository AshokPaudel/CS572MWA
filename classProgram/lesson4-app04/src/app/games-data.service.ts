import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  constructor(private http:HttpClient) { }
   baseUrl:string = "http://localhost:3000/api/";

  public getGames():Observable<Game[]>{
    const url:string =this.baseUrl+"games/";
    return this.http.get<Game[]>(url);
  }
  //the function is synchronous, returns Observable Immediately(Empty at the begining)
  //This observable will trigger in the future when I am done
  public getGame(id:string):Observable<Game>{
    const url:string =this.baseUrl+"games/"+id; //synchronous
    return this.http.get<Game>(url); //asynchronous
  }

  // public deleteGame(id:string):Observable<any>{
  //   const url:string =this.baseUrl+"games/"+id;
  //   return this.http.delete<any>(url);
  // }
  deleteGame = (gameId: string): Observable<any> => {
    const url: string = this.baseUrl + 'games/' + gameId;
    return this.http.delete<any>(url);
  };


  game!:Game;
  // private gameService:GamesDataService = new GamesDataService()

}
