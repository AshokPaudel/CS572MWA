import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NovelsDataService } from '../novels-data.service';
import { Novel, Author } from '../novel-list/novel-list.component';

@Component({
  selector: 'app-edit-novel',
  templateUrl: './edit-novel.component.html',
  styleUrls: ['./edit-novel.component.css']
})
export class EditNovelComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private novelDataService: NovelsDataService, private router: Router) { }
  novel!: Novel;
  novelId!:string;
  authors!: Author[];
  @ViewChild('novelDetailsForm')
  novelDetailsForm!: NgForm;

  ngOnInit(): void {
     this.novelId = this.activatedRoute.snapshot.params["novelId"];
    // this.novel = this.novelDataService.getCurrentNovel();
    this.novelDataService.getNovelDetails(this.novelId).subscribe({
      next:(novel)=>{
        this.novel=novel;
        this.authors = this.novel.authors;
         },
      error:(err)=>console.log("Error getting novel details ",err),
      complete:()=> console.log("done")
    })
    this.authors = this.novel.authors;
    console.log("List of authors ", this.authors);
  }

  onEdit(novelDetailsForm: NgForm): void {
    const novelId = this.activatedRoute.snapshot.params["novelId"];
    console.log(novelDetailsForm.value);
    this.novelDataService.editNovel(novelId, this.novel).subscribe({

      next: novel => {
        console.log("Novel updated ", novel);
        window.alert("Novel Updated");
        this.router.navigate(['/novels']);
        // this.router.navigate(['/operationSuccess']);

      },
      error: err => console.log("Error updating novel ", err),
      complete: () => console.log("Done")

    })
  }
  onDeleteAuthor():void{
    // const authorId=author._id;
    console.log("Author Id deletion request ");

  }


}
