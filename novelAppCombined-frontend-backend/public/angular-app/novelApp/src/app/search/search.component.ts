import { Component, OnInit } from '@angular/core';

import { Novel } from '../novel-list/novel-list.component';
import { NovelsDataService } from '../novels-data.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title: string= "";
  novels: Novel[]= [];
  isSearch:boolean=false;
  constructor(private novelsDataService:NovelsDataService) { }

  ngOnInit(): void {
  }
  search(): void {
    this.novelsDataService.searchNovels(this.title).subscribe({
      next:(response)=>{
        this.fillNovelsFromService(response);
        this.isSearch=true;
      },
      error:(err)=>console.log("error ", err),
      complete:()=>console.log("done")
    });


  }
  private fillNovelsFromService(movies: Novel[]) {
    this.novels= movies;
  }

}
