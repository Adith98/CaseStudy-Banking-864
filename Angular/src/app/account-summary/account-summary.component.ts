import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountSummary } from '../service/AccountHolder';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.css']
})
export class AccountSummaryComponent implements OnInit {

  transactions:any=[]
  userid:number=+sessionStorage.getItem("userid");
  account_number=+sessionStorage.getItem("account_number")
  constructor(private router:Router,private service:AccountSummary) { 
    this.fetchAlltransdetails();
  }

  fetchAlltransdetails() {
    debugger
    this.transactions = this.service.transAlldetails(this.userid).subscribe((data) => {
      this.transactions = data;
      for(var trans of this.transactions){
        if(trans.from_acc_num==this.account_number){
          trans.debited=true
        }
        else if(trans.paid_to_acc_num==this.account_number){
          trans.credited=true
        }
      }
    })

  }
  ngOnInit(): void {
  }

}
