import { Component, Input, OnInit } from '@angular/core';
import { StudentDataService } from '../student-data.service';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  students:Student[]=[];
//
  constructor(private studentService:StudentDataService) { }

  ngOnInit(): void {

    this.studentService.getStudents().subscribe(

      {
        next:students=>{
          this.students=students;
        },
        error:err=>{
          console.log("Error getting data ", err);
        },
        complete:()=>{
          console.log("Done");
        }

    }
    );
  }

}
export class Student{
   #_id!:string;
   #name!:string;
   #studentId!:number;
  #courses!:[{courseName:string,courseId:string}];


  get _id() {return this.#_id;}

  public get name(){
    return this.#name;
  }
  public get courses(){
    return this.#courses;
  }
  get studentId(){
    return this.#studentId;
  }
}
