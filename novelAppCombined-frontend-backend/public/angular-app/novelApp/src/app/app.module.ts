import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule} from 'ng2-search-filter';
import { ValidateEqualModule } from  'ng-validate-equal';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
// import { NgForm } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router'; //No need to import here although used in child component

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NovelListComponent } from './novel-list/novel-list.component';
import { NovelDetailsComponent } from './novel-details/novel-details.component';
import { AddNovelComponent } from './add-novel/add-novel.component';
import { OperationSuccessComponent } from './operation-success/operation-success.component';
import { OperationFailedComponent } from './operation-failed/operation-failed.component';
import { EditNovelComponent } from './edit-novel/edit-novel.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';
import { DeleteAuthorComponent } from './delete-author/delete-author.component';
import { AddAuthorComponent } from './add-author/add-author.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NovelListComponent,
    NovelDetailsComponent,
    AddNovelComponent,
    OperationSuccessComponent,
    OperationFailedComponent,
    EditNovelComponent,
    EditAuthorComponent,
    DeleteAuthorComponent,
    AddAuthorComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    ValidateEqualModule,
    // NgForm,
    HttpClientModule, //If not import here cause error
    // ActivatedRoute, //cannot import here cause error
    //NgModule //cannot import here cause error
    RouterModule.forRoot([
      {
      path:"",
      component:HomeComponent
     },
     {
      path:"register",
      component:RegistrationComponent
     },
     {
      path:"novels",
      component:NovelListComponent
     },
     {
      path:"novel/:novelId",
      component:NovelDetailsComponent
     },
     {
       path:"addNovel",
       component:AddNovelComponent
     },{
       path:"operationSuccess",
       component:OperationSuccessComponent
     },
     {
       path:"operationFailed",
       component:OperationFailedComponent
     },{
       path:"novelEdit/:novelId",
       component:EditNovelComponent
     },
     {
      path:"novelEdit/:novelId/editAuthor/:authorId",
      component:EditAuthorComponent
    },{
      path:"novelEdit/:novelId/deleteAuthor/:authorId",
      component:DeleteAuthorComponent
    },{
      path:"novelEdit/:novelId/addAuthor",
      component:AddAuthorComponent
    }
    ])
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

//{provide:JWT_OPTIONS,useValue:""}
