import { Component } from '@angular/core';
import { User } from '../../service/user.service';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  standalone:false,
  selector: 'app-user-detail-component',
  templateUrl: './user-detail-component.component.html',
  styleUrl: './user-detail-component.component.css'
})
export class UserDetailComponent {
    user!: User|undefined;
    ID!: number;
    Email!: string;
    Name!: string;
    Password!: string;
    isLoading: boolean = true;
    
    showPasswords: boolean = false;
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
    togglePasswordVisibility(): void {
      this.showPasswords = !this.showPasswords;
    }
}
