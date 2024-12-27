import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import * as usersData from '../Assets/users_db.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';

class FileService {
  saveAsJSON(data: any, fileName: string): void {
    const jsonString = JSON.stringify(data, null, 0);
    const blob = new Blob([jsonString], { type: '../Assets' });
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();

    window.URL.revokeObjectURL(url); 
  }
}



export class User{
  id:string;
  ID:number;
  name: string;
  Email:string;
  Password:string;

  constructor(id:string, ID:number, name: string, Email:string, Password:string) {
    this.id = id;
    this.ID = ID;
    this.name = name;
    this.Email = Email;
    this.Password = Password;
  }
  
  update(name: string, Email:string, Password:string): void {
    this.name = name;
    this.Email = Email;
    this.Password = Password;
  }
  getID(): Number {return this.ID;}
  getJSID(): string {return this.id;}
}



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private users: User[] = [];
  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { 
    this.loadUsers();
    console.log('UserService constractor.');
  }


  loadUsers(){
    console.log('Loading users...');
    this.http.get<User[]>(this.apiUrl).subscribe((data) => {
      this.users = data.map(
        (user) => new User(user.id, user.ID || 0, user.name, user.Email, user.Password)
      );
      console.log('about to load');
      this.usersSubject.next([...this.users]);
      console.log('Users loaded:', this.users);
    });
  }

  async AddUser(name: string, ID:number, Email:string, Password:string): Promise<void> {
    try {
      const existingUser = this.users.find(user => user.ID === ID);
      if (existingUser) {
        console.warn(`User with ID ${ID} already exists. Please use a unique ID.`);
        return;
      }
  
      const newUser = {ID:ID, name:name, Email:Email, Password:Password};
  
      const addedUser = await this.http.post<User>(this.apiUrl, newUser).toPromise();
  
      if (addedUser) {
        this.loadUsers();
        console.log(`User "${name}" added successfully with ID: ${addedUser.ID}`);
      }
    } catch (error) {
      window.alert('Error adding user:');
    }
  }

  getUsers(): Observable<Array<User>> {
    return this.usersSubject.asObservable();
  }

  getUser(id: number): User | undefined  {
    const foundUser = this.users.find(user => user.getID() === id);

    if (foundUser) {
      console.log('Found user:', foundUser);
      return foundUser;
    } else {
      window.alert(`User with ID ${id} not found.`);
      return undefined;
    }
  }

  isUniqueID(id: number): boolean {
    const foundUser = this.users.find(user => user.getID() === id);
    if (foundUser) {
      return false;
    }
    else{
      return true;
    }
  }

  updateUser(id: number, name: string, Email:string, Password:string): void {
    const user = this.getUser(id);
    console.log('user:', user);

    if (user === undefined) { 
      window.alert(`User with ID ${id} not found.`);
      return;
    }

    const jsID = user.id; 
    console.log('jsID:', jsID);

    const updatedUser = { id: jsID, ID: id, name, Email, Password }; 
    console.log('updatedUser:', updatedUser);

    this.http.put<User>(`${this.apiUrl}/${jsID}`, updatedUser).subscribe({// Update the user in the JSON Server using the JSON Server ID (jsID)
      next: (response) => {
        console.log('response:', response);
        const index = this.users.findIndex((u) => u.ID === id); 
        if (index !== -1) {
          this.users[index].update(response.name, response.Email, response.Password);
          this.usersSubject.next([...this.users]); 
          console.log(`User "${response.name}" updated successfully.`);
        }
      },
      error: (error) => {
        console.error(`Failed to update user with JSON Server ID ${jsID}:`, error);
      }
    });
  }

  deleteUser(id: number): void {
    const user = this.getUser(id);
    console.log('user:', user);

    if (user === undefined) { 
      console.warn(`User with ID ${id} not found.`);
      return;
    }

    const jsID = user.id; // Use the JSON Server's `id` field
    console.log('jsID:', jsID);
    this.http.delete<void>(`${this.apiUrl}/${jsID}`).subscribe(() => {
      this.users = this.users.filter((user) => user.ID !== id);
      this.usersSubject.next([...this.users]);
      console.log(`User with ID ${id} deleted successfully.`);
    });
    this.loadUsers();
    
    console.log(`User deleted successfully.`);
  }
}
