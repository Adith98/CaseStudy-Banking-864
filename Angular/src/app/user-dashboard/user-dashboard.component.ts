import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountSummary } from '../service/AccountHolder';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  accountsummary: any = {};
  userdetails:any={};
  userid: number = +sessionStorage.getItem("userid");
  net_banking = Boolean(sessionStorage.getItem('net-banking'))
  last_login:any
  
  constructor(private router: Router, private service: AccountSummary) {
    this.fetchdetails();
    this.fetchCustomer();
    this.getLastLogin();
  }

  fetchdetails() {
    this.service.useraccountsummary(this.userid).subscribe(
      (data) => {
        this.accountsummary = data;
        sessionStorage.setItem('account_number',this.accountsummary.account_number)
        sessionStorage.setItem('balance',this.accountsummary.current_balance)
      })
  }

  fetchCustomer() {
    this.service.getCustomer(this.userid).subscribe((data) => {
      this.userdetails = data;
    })
  }

  getLastLogin(){
    this.service.getLastLogin(this.userid).subscribe(
      
      data=>{
        debugger
        this.last_login=data
    })
  }

  ngOnInit(): void {
    this.router.getCurrentNavigation()
  }

  changePassword(){
    if(this.net_banking){
      this.router.navigate(["/new-password"])
    }
    else{
      this.router.navigate(["/new-login-password"])
    }
  }


  logout() {
    sessionStorage.clear();
    this.router.navigate(["/"]);
  }
}
