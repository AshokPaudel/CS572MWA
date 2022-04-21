import { Component, OnInit } from '@angular/core';
import { NovelsDataService } from '../novels-data.service';


export class Novel {
  _id!: string;
  title!: string;
  numberOfPages!: number;
  authors: Author[]=[];
  // authors!: [Author];

  addAuthor(author:Author){
    this.authors.push(author);
    console.log("novel authors: ", this.authors);
    // Novel.prototype.authors=author;

  }
}
//{name:"",country:"",_id:""}
export class Author {
  _id!: string;
  name!: string;
  country!: string;
}


@Component({
  selector: 'app-novel-list',
  templateUrl: './novel-list.component.html',
  styleUrls: ['./novel-list.component.css']
})
export class NovelListComponent implements OnInit {
  novels: Novel[] = [];
  // novelSearch!:string;

  constructor(private novelService: NovelsDataService) {
    // this.novelService=novelService;
  }

  ngOnInit(): void {
    console.log("I am at Init");
    this.novelService.getNovels().subscribe({
      next: novels => this.novels = novels,
      error: err => console.log(err),
      complete: () => console.log("completed")
    });
  }


}
