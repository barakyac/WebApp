import { Component, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '../../service/user.service';
import { Observable } from 'rxjs'; // Import Observable
import { UserService } from '../../service/user.service';


@Component({
  standalone:false,
  selector: 'app-user-list-component',
  templateUrl: './user-list-component.component.html',
  styleUrl: './user-list-component.component.css'
})
export class UserListComponent implements OnInit {
  users !: Observable<Array<User>>;


  showPasswords: { [key: number]: boolean } = {};
  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
    
    // this.users = new Observable<Array<User>>();
    this.users = this.userService.getUsers();
    console.log('Users:', this.users);
    

  }

  togglePasswordVisibility(userId: number): void {
    this.showPasswords[userId] = !this.showPasswords[userId];
  }
}
