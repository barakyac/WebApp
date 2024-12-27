import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list-component/user-list-component.component';
import { UserDetailComponent } from './components/user-detail-component/user-detail-component.component';
import { UserFormComponent } from './components/user-form-component/user-form-component.component';
import { UserFormEditComponent } from './components/user-form-edit/user-form-edit.component';

export const routes: Routes = [
    
    { path: 'users', component: UserListComponent },
    { path: 'users/new', component: UserFormComponent },
    { path: 'users/:id', component: UserDetailComponent },
    { path: 'users/edit/:id', component: UserFormEditComponent },
    { path: '', redirectTo: '/users', pathMatch: 'full' }, // דף ברירת מחדל
    { path: '**', redirectTo: '/users', pathMatch: 'full' } // ניתוב ברירת מחדל (404)
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
