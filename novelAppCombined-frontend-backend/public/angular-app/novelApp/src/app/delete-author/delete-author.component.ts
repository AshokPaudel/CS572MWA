import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NovelsDataService } from '../novels-data.service';

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.css']
})
export class DeleteAuthorComponent implements OnInit {

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private novelDataService:NovelsDataService) { }
   novelId!:string;
  ngOnInit(): void {
    const flag=window.confirm("Are you sure, you want to delete the Author ");
     this.novelId= this.activatedRoute.snapshot.params['novelId'];
    const authorId= this.activatedRoute.snapshot.params['authorId'];
    this.novelDataService.deleteAuthor(this.novelId,authorId).subscribe({
      next:novel=>window.alert("Novel deleted"),
      error:err =>window.alert("Error deleting"),
      complete:()=>{
        console.log("Done");
        const routeURL= "novel/"+this.novelId;
        console.log(routeURL);
        this.router.navigate([routeURL]);
      }

    });
    // const routeURL= "novels/"+this.novelId;
    //     console.log(routeURL);
    //     this.router.navigate([routeURL]);

  }

}
