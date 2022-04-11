import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { isEmpty } from 'rxjs';
// import { FormsModule } from '@angular/forms';
import { Novel } from '../novel-list/novel-list.component';
import { Author } from '../novel-list/novel-list.component';
import { NovelsDataService } from '../novels-data.service';

@Component({
  selector: 'app-add-novel',
  templateUrl: './add-novel.component.html',
  styleUrls: ['./add-novel.component.css']
})
export class AddNovelComponent implements OnInit {

  novel: Novel = new Novel();
  author: Author = new Author();


  constructor(private novelsDataService: NovelsDataService, private router:Router) {
    this.novelsDataService = novelsDataService;
  }


  @ViewChild('addNovelForm')
  addNovelForm!: NgForm;

  ngOnInit(): void {

  }

  public addNovel(addNovelForm: NgForm): void {
    console.log("Add new form at add novel component caled");
    // this.addNovelForm.getFormGroup
    if(!addNovelForm.value.title){
      alert("Title is required");
      return;
    }
    if(addNovelForm.value.authorName){
      this.author.name = addNovelForm.value.authorName;
      this.author.country = addNovelForm.value.authorCountry;
    }else if(addNovelForm.value.authorCountry && !addNovelForm.value.authorName){
      alert("Author name is required");
      return;
    }

    console.log("Author ", this.author);

    this.novel.title = addNovelForm.value.title;
    this.novel.numberOfPages = addNovelForm.value.numberOfPages;
    if(Object.keys(this.author).length != 0) {
      this.novel.addAuthor(this.author);
    }

    console.log('novel', this.novel);

    this.novelsDataService.addNovel(this.novel).subscribe({
      next: novel => {
        console.log("Novel Added ", novel);
        this.router.navigate(['operationSuccess']);
      },
      error: err => {
        console.log("Error Adding novel ", err);
        // this.router.navigate(['operationFailed']);
        alert(JSON.stringify(err.message));
      },
      complete: () => console.log("Done")
    });
    // },0);


  }

}
