import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StudentComponent } from './student/student.component';
import {OneStudentComponent} from './one-student/one-student.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StudentComponent,
    OneStudentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    RouterModule.forRoot([{
      path:"student",
      component:StudentComponent
    },{
      path:"student/:Id",
      component:OneStudentComponent
    }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
