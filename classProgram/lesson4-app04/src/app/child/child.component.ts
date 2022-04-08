import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  x=0;
  y=1;
  @Input()
  x2:number=0;
  @Input()
  y2:number=0;

  @Output()
  addEvent:EventEmitter<number> = new EventEmitter<number>();
  z:number=0;

  constructor() { }

  ngOnInit(): void {
  }
  add():void{
    this.z=this.x2+this.y2;
    this.addEvent.emit(this.z);
  }

}
