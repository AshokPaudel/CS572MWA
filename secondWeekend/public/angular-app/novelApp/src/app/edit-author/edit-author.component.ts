import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Author, Novel } from '../novel-list/novel-list.component';
import { NovelsDataService } from '../novels-data.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
   novelId !:string;
   authorId!:string;
   author!:Author;
  constructor(private activatedRoute: ActivatedRoute, private novelDataService: NovelsDataService,private router:Router) { }

  @ViewChild('authorEditForm')
  authorEditForm!: NgForm;

  ngOnInit(): void {
     this.novelId = this.activatedRoute.snapshot.params["novelId"];
    this.authorId = this.activatedRoute.snapshot.params["authorId"];
    console.log("authorId is ", this.authorId);
    this.novelDataService.getAuthor(this.novelId,this.authorId).subscribe({
      next:author=>this.author=author,
      error:error=>console.log("Error fetching data ",error),
      complete:()=>console.log("Done")

    }

    )
    // console.log("Current Novel is", this.novel);
    // console.log("Current Author is ", this.novel.authors.filter(au => au._id == authorId)[0]);
    // this.author = this.novel.authors.filter(au => au._id == authorId)[0];
    setTimeout(()=>   this.authorEditForm.setValue(this.author),0)
  }

  public authorEdit(authorEditForm: NgForm) {
    console.log("Edit author requested");
    this.author=authorEditForm.value;
    console.log("At author EDIt ",this.author );
    console.log(console.log("At author EDIt ",JSON.stringify(this.author) ));

    this.novelDataService.editAuthor(this.novelId,this.authorId,this.author).subscribe({
      next:author=>{
        this.author=author
        window.alert("Author Successfully Modified");
        // const routeURL = "novel/"+this.novelId+"/author/"+this.authorId;
        const routeURL= "novelEdit/"+this.novelId;
        console.log(routeURL);
        this.router.navigate([routeURL]);
        // this.router.navigate("/novel/"+this.novelId+"/authors/"+this.authorId);
      },
      error:err=>console.log("Error while editing data ",err),
      complete:()=>console.log("Done")
    })
  }
}
