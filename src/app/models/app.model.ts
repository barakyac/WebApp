import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs'; 
import {routes} from '../app.routes';
import { UserService } from '../service/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from '../app.component';
import { UserDetailComponent } from '../components/user-detail-component/user-detail-component.component';
import { UserFormComponent } from '../components/user-form-component/user-form-component.component';
import { UserFormEditComponent } from '../components/user-form-edit/user-form-edit.component';
import { UserListComponent } from '../components/user-list-component/user-list-component.component';


@NgModule({
  declarations: [
    UserFormComponent,
    UserDetailComponent,
    UserFormEditComponent,
    UserListComponent,
  ],
  imports: [    
    //BrowserModule,
    CommonModule,
    FormsModule,
    
  ],
  exports: [
    UserFormComponent,
    UserDetailComponent,
    UserFormEditComponent,
    UserListComponent
  ],
  providers: [
    UserService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
