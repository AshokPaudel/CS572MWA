import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  game!: Game;

  constructor(private route:ActivatedRoute,private gamesService:GamesDataService, private router:Router) {
   }

  // onDelete(): void {
  //    const gameId = this.route.snapshot.params["gameId"];
  //    this.gameService.deleteGame(gameId);
  //   //  this.router.navigate(['/games']);
  // }

  ngOnInit(): void {
    const gameId = this.route.snapshot.params['gameId'];
    this.gamesService.getGame(gameId).subscribe((game) => (this.game = game));
  }

  onDelete = () => {
    this.gamesService.deleteGame(this.game._id).subscribe(() => {
      this.router.navigate(['/games']);
    });
  };

}
