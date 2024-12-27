import { Component, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { AppModule } from "./models/app.model";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [AppModule, RouterLink, RouterOutlet]
})
export class AppComponent {
  title = 'WebApp';
}
