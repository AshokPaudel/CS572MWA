import { Component, OnInit } from '@angular/core';

import { Student } from '../student/student.component';
import { StudentDataService } from '../student-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-one-student',
  templateUrl: './one-student.component.html',
  styleUrls: ['./one-student.component.css']
})
export class OneStudentComponent implements OnInit {
  student!:Student;

  sid: any;

  constructor(private route:ActivatedRoute, private studentDataService:StudentDataService ) {

  }

  ngOnInit(): void {
    const stId = this.route.snapshot.params["Id"];
    this.sid = this.route.snapshot.params;
    this.studentDataService.getStudent(stId).subscribe(
      {
        next: (student)=>{
          this.student = student;
        }
      });


  }

}
