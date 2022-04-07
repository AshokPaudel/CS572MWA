import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // constructor() { };
  //DI
  constructor(private _router: Router) { }
  onHome(): void {
    this._router.navigate(['']);
  }
  onGames(): void {
    this._router.navigate(['/games']);
  }

  ngOnInit(): void {
  }

}
