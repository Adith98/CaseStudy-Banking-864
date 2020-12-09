import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountSummary } from '../service/AccountHolder';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {

  tdetails1:any=[];
  account_number=+sessionStorage.getItem("account_number")
  userid:number=+sessionStorage.getItem("userid");
  startdate:string;
  enddate=this.formatDate(new Date());
  
  constructor(private router:Router,private service:AccountSummary) { }

  formatDate(date:any) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }


  showtrans(){
    console.log(this.startdate)
    console.log(this.enddate)

    if(this.startdate==undefined){
      alert("Enter From Date")
    }
    else if(this.startdate>this.enddate){
      alert("Cannot have From Date greater than Current Date")
    }
    else{
      this.tdetails1 = this.service.transdatedetails(this.userid,this.startdate,this.enddate).subscribe((data) => {
        this.tdetails1 = data;
        for(var trans of this.tdetails1){
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
   
    
    
  }

  ngOnInit(): void {
  }

}
