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

  public getGame(id:string):Observable<Game>{
    const url:string =this.baseUrl+"games/"+id;
    return this.http.get<Game>(url);
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
