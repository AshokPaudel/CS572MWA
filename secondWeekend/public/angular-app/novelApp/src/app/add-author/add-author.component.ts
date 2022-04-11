import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../novel-list/novel-list.component';
import { NovelsDataService } from '../novels-data.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  novelId !:string;
  authorId!:string;
  author!:Author;
 constructor(private activatedRoute: ActivatedRoute, private novelDataService: NovelsDataService,private router:Router) { }

 @ViewChild('authorAddForm')
 authorAddForm!: NgForm;

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

   setTimeout(()=>   this.authorAddForm.setValue(this.author),0)
 }
 public authorAdd(authorAddForm: NgForm) {
  console.log("ADd author requested");
  this.author=authorAddForm.value;
  console.log("At author ADd ",this.author );
  console.log(console.log("At author EDIt ",JSON.stringify(this.author) ));

  this.novelDataService.addAuthor(this.novelId,this.author).subscribe({
    next:author=>{
      this.author=author
      window.alert("Author Successfully Added");
      const routeURL= "novelEdit/"+this.novelId;
      console.log(routeURL);
      // this.router.navigate([routeURL]);
      this.router.navigateByUrl("novelEdit/"+this.novelId);
      // this.novelDataService.getNovelDetails(this.novelId).subscribe({
      //   next:author=>console.log("Fetched succesfully"),
      //   error:error=>console.log("Error fetching data ",error),
      //   complete:()=>console.log("Done")
      // });
    },
    error:err=>console.log("Error while Adding data ",err),
    complete:()=>console.log("Done")
  })
}
}
