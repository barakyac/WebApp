import { Component } from '@angular/core';
import { User } from '../../service/user.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  standalone:false,
  selector: 'app-user-form-edit',
  templateUrl: './user-form-edit.component.html',
  styleUrl: './user-form-edit.component.css'
})
export class UserFormEditComponent {
  user!: User|undefined;
  ID!: number;
  Email!: string;
  Name!: string;
  Password!: string;
  isLoading: boolean = true;

  
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.loadUserDetails();
  }

  ngOnInit(): void {
    
  }
  loadUserDetails(): void {
    console.log('Loading user details...');
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID:', id);
    if (id !== null) {
      this.ID = parseInt(id);
      this.findUser(this.ID);
    }
    this.isLoading = false;
  }
  clearForm(): void {
    this.Name = '';
    this.ID = 0;
    this.Email = '';
    this.Password = '';
  }
  findUser(ID:number): void {

    this.user = this.userService.getUser(ID);
    if (this.user !== undefined) {
      this.Email = this.user.Email;
      this.Name = this.user.name;
      this.Password = this.user.Password
    }
  }

  isUser(): boolean {
    return this.user !== undefined;
  }
  EditUser(ID:number, Name:string, Email:string, Password:string): void {
    // if (this.user !== undefined) {
    //   this.userService.updateUser(this.ID, this.Name, this.Email, this.Password);
    // }
    console.log('Edit user');
    const user = { ID: ID, Name: Name, Email: Email, Password: Password };
    console.log("user:", user);
    if (this.user) {
      this.userService.updateUser(this.ID, this.Name, this.Email, this.Password);
      console.log(`User "${this.Name}" updated successfully.`);
    } else {
      console.warn('No user loaded to update.');
    }
  }
  deleteUser(ID:number): void {
    if (this.user !== undefined) {
      this.userService.deleteUser(ID);
    }
    this.clearForm();

  }
}
