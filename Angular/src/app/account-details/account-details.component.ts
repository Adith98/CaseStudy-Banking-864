import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountSummary } from '../service/AccountHolder';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  transactions:any=[]
  userid:number=+sessionStorage.getItem("userid");
  account_number=+sessionStorage.getItem("account_number")
  userdetails:any={};
  useraddress:any=[];
  constructor(private router:Router,private service:AccountSummary) { 
    this.fetchtransdetails();
    this.fetchCustomer();
    this.fetchCustomerAddress();
  }

  fetchtransdetails() {
    this.transactions = this.service.transdetails(this.userid).subscribe((data) => {
      debugger
      this.transactions = data;
      for(var trans of this.transactions){
        if(trans.from_acc_num==this.account_number){
          trans.debited=true
        }
        else if(trans.paid_to_acc_num==this.account_number){
          trans.credited=true
        }
      }
      console.log(data)
      
    })
  }

  fetchCustomerAddress() {
    this.service.getCustomerAdd(this.userid).subscribe((data) => {
      this.useraddress = data;
    })
  }

  fetchCustomer() {
    this.service.getCustomer(this.userid).subscribe((data) => {
      this.userdetails = data;
    })
  }

  ngOnInit(): void {
  }

}
