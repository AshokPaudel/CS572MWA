import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  addNewGameForm!:FormGroup;
  // game!:Game;
  responseMessage!:any;

  constructor(private formBuilder: FormBuilder, private gameService:GamesDataService) {
    this.resetForm();
    // this.addNewGameForm = this.formBuilder.group({
    //   title: "",
    //   year: "",
    //   rate: "",
    //   price: "",
    //   minPlayers: "",
    //   maxPlayers: "",
    //   minAge: "",
    // })
  }
  resetForm(){
    this.addNewGameForm = this.formBuilder.group({
      title: "",
      year: "",
      rate: "",
      price: "",
      minPlayers: "",
      maxPlayers: "",
      minAge: "",
    })

  }
  ngOnInit(): void {
  }
  addNewGameReq(formData: FormGroup){
    console.log("Form Submitted");
    console.log(formData.value);
    this.gameService.addNewGame(formData.value).subscribe({
      next:game=>{
        this.responseMessage=game;
        this.resetForm();
      },
      error:err=>{
        this.responseMessage=err;
        console.log("Error ",err);
      },
      complete: ()=>{
        console.log("Done");

      }
    })

    // const body={
    //   title: formData.value.title,
    //   year: formData.value.year,
    //   rate: formData.value.rate,
    //   price: formData.value.price,
    //   minPlayers:
    //   maxPlayers
    //   minAge: ""
    // }
  }

}
