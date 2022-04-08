import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }
  x:number = 3;
  y:number = 4;
  z: number = 0;
  ngOnInit(): void {
  }
  setZ(message:number):void{
    this.z=message;
  }

}
