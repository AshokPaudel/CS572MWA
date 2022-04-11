import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Novel,Author } from '../novel-list/novel-list.component';
import { NovelsDataService } from '../novels-data.service';

@Component({
  selector: 'app-novel-details',
  templateUrl: './novel-details.component.html',
  styleUrls: ['./novel-details.component.css']
})
export class NovelDetailsComponent implements OnInit {
  novelId!:string;

  constructor(private novelDataService:NovelsDataService, private activatedRoute:ActivatedRoute, private router:Router) {
    this.novelDataService=novelDataService;
    this.activatedRoute=activatedRoute;
  }

  // @ViewChild('novelDetailsForm')
  // novelDetailsForm!: NgForm;

  novel!:Novel;
  authors!:Author;


  ngOnInit(): void {
    this.novelId = this.activatedRoute.snapshot.params["novelId"];
    this.novelDataService.getNovelDetails(this.novelId).subscribe({
      next:novel=>{
        this.novel=novel;
        this.authors=this.novel.authors[0];
        this.novelDataService.saveCurrentNovel(this.novel);
        // this.novel1=novel;
        // this.authors1=this.novel.authors[0];
      }

    });
    // setTimeout(()=>{
    //   // console.log("novel inside timeout ", this.novel1);
    //   // this.novelDetailsForm.setValue(this.novel1);
    // },0)
    // this.authors=this.novel.authors;
    // this.authors=this.novel.authors;
  }
  onDelete():void{
    const novelId= this.activatedRoute.snapshot.params["novelId"];
    const delConfirm = window.confirm("Are you sure you want to delete ?");
    // console.log(delConfirm);
    if(!delConfirm){
      return;
    }
    this.novelDataService.deleteNovel(novelId).subscribe({
      next:novel=>{
        console.log("Novel deleted ", novel);
        this.router.navigate(['/operationSuccess']);

      },
      error:err=> console.log("Error deleting novel ",err),
      complete:()=>console.log("Done")
    })
  }



}
