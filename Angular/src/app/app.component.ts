import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banking';
  UserLoggedIn=Boolean(sessionStorage.getItem('user-logged-in'));
  AdminLoggedIn=Boolean(sessionStorage.getItem('admin-logged-in'));
  constructor(private route:Router){
    
  }

  ngDoCheck(){
    this.UserLoggedIn=Boolean(sessionStorage.getItem('user-logged-in'));
    this.AdminLoggedIn=Boolean(sessionStorage.getItem('admin-logged-in'));
  }

  Logout(){
    sessionStorage.clear();
    this.route.navigate(["/"])
  }


}
