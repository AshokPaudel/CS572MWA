import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesDataService } from '../games-data.service';

export class Game {
  #_id!: string;
  #title!: string;
  #year!: string;
  #rate!: number;
  #price!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  get _id() {return this.#_id;}
  get title() {return this.#title;}
  set title(title: string) {this.#title= title;}
  get year() {return this.#year;}
  get rate() {return this.#rate;}
  get price() {return this.#price;}
  set price(price: number) { this.#price= price;}
  get minPlayers() {return this.#minPlayers;}
  get maxPlayers() {return this.#maxPlayers;}
  get minAge() {return this.#minAge;}
  constructor(id: string, title: string, price: number) {
  this.#_id= id;
  this.#title= title;
  this.#price= price;
  }
  }


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{
  games: Game[] =[];

  // game!:Game;

  constructor(private route:ActivatedRoute,private gameService:GamesDataService) {}
  //   this.game=new Game("","",0);
  //  }

  ngOnInit(): void {
    // const gameId = this.route.snapshot.params["gameId"];
    this.gameService.getGames().subscribe(games=>this.games=games);
  }

}
