import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';



@Component({
  standalone:false,
  selector: 'app-user-form-component',
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.css'
})
export class UserFormComponent {
  name: string = '';
  ID: number = 0;
  Email: string = '';
  Password: string = '';
  IDs: Set<number> = new Set();
  constructor(private userService: UserService) {

  }

  addUser(name: string, ID:number, Email:string, Password:string): void {
    if (!this.name || !this.ID || !this.Email || !this.Password) {
      window.alert('All fields are required!');
      return;
    }
    if(!this.validateID()){
      window.alert('ID already exists!');
      return;
    }
    this.userService.AddUser(this.name, this.ID, this.Email, this.Password);
    this.IDs.add(this.ID);
    console.log('User added successfully!');
    this.clearForm();
  }
  validateID(): boolean {
    return this.userService.isUniqueID(this.ID);
  }

  clearForm(): void {
    this.name = '';
    this.ID = 0;
    this.Email = '';
    this.Password = '';
  }
}
