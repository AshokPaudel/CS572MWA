import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http'

import { Student } from './student/student.component';


@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private http:HttpClient) { }

  baseUrl = "http://localhost:3000/api";
  public getStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.baseUrl+"/students")
  }
  public getStudent(stId:string):Observable<Student>{
    return this.http.get<Student>(this.baseUrl+"/students/"+stId);
  }

}
