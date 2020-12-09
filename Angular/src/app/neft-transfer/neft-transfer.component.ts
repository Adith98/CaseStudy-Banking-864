import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {TransactionServices} from '../service/transaction';

@Component({
  selector: 'app-neft-transfer',
  templateUrl: './neft-transfer.component.html',
  styleUrls: ['./neft-transfer.component.css']
})
export class NeftTransferComponent implements OnInit {

  transaction:any={}
  transaction_date;
  currentDate = new Date()

  userid: number = +sessionStorage.getItem("userid");
  account_number=+sessionStorage.getItem("account_number")
  balance = + sessionStorage.getItem('balance')
  debit;

  
  NeftForm:FormGroup
  success=false
  error=false
  message:string

  constructor(private service:TransactionServices,private route:Router) { 
    this.NeftForm = new FormGroup({
      //from_account_number:new FormControl(null,[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^([5][1])\\d{9}$')]),
      to_account_number:new FormControl(null,[Validators.required,Validators.pattern('^([5][1])\\d{9}$')]),
      amount:new FormControl(null,[Validators.required]),
      transaction_date:new FormControl(null,[Validators.required]),
      remark:new FormControl(null,[Validators.required]),
    })
  }


  AddBeneficiary(){
    this.route.navigate(["/userdashboard/Fund-Transfer/add-beneficiary"])
  }


  addTransaction(obj:any){
    this.service.addTransaction(obj).subscribe(
      data=>{
        console.log(data)
        this.route.navigate(["/transaction-receipt",data.reference_id])
      }
    )
  }

  updateBalance(from_acc_no:number,to_acc_no:number,spending:number)
  {
    this.service.updateBalance(from_acc_no,to_acc_no,spending).subscribe(
      data=>{
        debugger
        sessionStorage.setItem('balance',data)
        console.log(data)
      }
    )
  }



  TransferNeft(){
    var currentTime = new Date()
    var transaction_date = new Date(this.NeftForm.value.transaction_date);  
    transaction_date.setHours(0,0,0,0)
    currentTime.setHours(0,0,0,0)


    if(this.NeftForm.valid){
      if(this.NeftForm.value.to_account_number==this.account_number){
        this.error=true
        this.success=false
        this.message="You cannot Transfer to your own Account Number"
      }
      else if(this.NeftForm.value.amount<1){
        this.error=true
        this.success=false
        this.message="Minimum amount required = Re.1"
      }
      else if(transaction_date<currentTime){
        this.error=true
        this.success=false
        this.message="Transaction Date needs to be a current date or a future date"
      }
      else if(transaction_date.getDay()==0){
        this.error=true
        this.success=false
        this.message="Transaction Date is a non working Day. It will be shifted to the next working day."
      }
      else if ((this.balance - 5000) <= this.NeftForm.value.amount)//min balance in account should be 5000
      {
        this.error = true;
        this.success = false;
        this.message = "Transaction Amount exceeds the account balance requirement.Your current Balance is Rs." + this.balance + " Please note that Minimum balance in account should be Rs.5000";

      }
      else{
        this.transaction.mode="NEFT"
        this.transaction.paid_to_acc_num=this.NeftForm.value.to_account_number
        this.transaction.from_acc_num=this.account_number
        this.transaction.amount=this.NeftForm.value.amount
        this.transaction.tax = 0
        this.transaction.trans_time = this.formatDate(transaction_date)
        this.transaction.tran_status = "Pending"
        this.transaction.remark = this.NeftForm.value.remark
        
        console.log(this.transaction)

        //this.addTransaction(this.transaction)
        this.debit=this.transaction.amount;
        this.error=false
        this.success=true
        this.message="Details Entered seem valid, Click on Continue for further steps."
      }
    }else{
      this.error=true
      this.success=false
      this.message="Invalid"
    }
  }



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

  beneficiary_list:any

  ngOnInit(): void {
    this.service.getBeneficiaries(this.account_number).subscribe(
      data=>{
        this.beneficiary_list=data
      }
    )
  }


  continue=false
  Continue(){
    this.continue=true
    console.log("You are here")
  }

  transaction_password:string
  password_error:string
  password_success:string


  checkTransPassword(acc_num:number,password:string){
    this.service.checkTransactionPassword(acc_num,password).subscribe(
      data=>{
        if(data=="Error"){
          this.password_success=null
          this.password_error="Error : You have Entered Wrong Password"
        }
        else{
          this.password_error=null
          this.password_success="Success : You have Entered Correct Password"
          if (this.transaction.trans_time == this.formatDate(this.currentDate)) {
            this.transaction.tran_status = "Done";
            this.updateBalance(this.account_number,this.NeftForm.value.to_account_number,this.debit);
            this.addTransaction(this.transaction);
          }
          else {
            this.addTransaction(this.transaction);
          }
        }
      }
    )
  }



  CheckPassword(){

    if(this.transaction_password==undefined || this.transaction_password==""){
      this.password_success=null
      this.password_error="Error : you have not Entered Password"
    }
    else{
      this.password_error=null
      this.checkTransPassword(this.account_number,this.transaction_password)
    }
  }
}
