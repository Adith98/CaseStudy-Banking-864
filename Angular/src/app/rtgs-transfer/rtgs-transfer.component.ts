import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionServices } from '../service/transaction';
@Component({
  selector: 'app-rtgs-transfer',
  templateUrl: './rtgs-transfer.component.html',
  styleUrls: ['./rtgs-transfer.component.css']
})
export class RtgsTransferComponent implements OnInit {
  transaction: any = {};
  transaction_date;
  currentDate = new Date()

  //static variables
  userid: number = +sessionStorage.getItem("userid");
  account_number=+sessionStorage.getItem("account_number")
  balance = + sessionStorage.getItem('balance')
  debit;

  RtgsForm: FormGroup;
  error = false;
  success = false;
  message: string;

  constructor(private service: TransactionServices,private route:Router) {
    this.RtgsForm = new FormGroup({
      //from_account_number:new FormControl(null,[Validators.required,Validators.minLength(11),Validators.maxLength(11),Validators.pattern('^([5][1])\\d{9}$')]),
      to_account_number: new FormControl(null, [Validators.required, Validators.pattern('^([5][1])\\d{9}$')]),
      amount: new FormControl(null, [Validators.required]),
      transaction_date: new FormControl(null, [Validators.required]),
      maturity_Instructions: new FormControl(null, [Validators.required]),
      remark: new FormControl(null, [Validators.required]),
    })
  }
  TransferRtgs() {

    this.transaction_date = new Date(this.RtgsForm.value.transaction_date);
    this.transaction_date.setHours(0, 0, 0, 0);
    this.currentDate.setHours(0, 0, 0, 0);
    console.log(this.transaction_date);
    console.log(this.currentDate);

    if (this.RtgsForm.valid) {
      if (this.RtgsForm.value.to_account_number == this.account_number) {
        this.error = true;
        this.success = false;
        this.message = "You cannot transfer to your own account";
      }
      else if (this.RtgsForm.value.amount < 200000) {
        this.error = true;
        this.success = false;
        this.message = "RTGS supports transaction of Rs.2,00,000 and above!"
      }
      else if (this.transaction_date < this.currentDate) {
        this.error = true;
        this.success = false;
        this.message = "Transaction time already passed";
      }
      else if (this.transaction_date.getDay() == 0) {
        this.error = true;
        this.success = false;
        this.message = "Not a working Day";
      }
      else if ((this.balance - 5000) <= this.RtgsForm.value.amount)//min balance in account should be 5000
      {
        this.error = true;
        this.success = false;
        this.message = "Transaction Amount exceeds the account balance requirement.Your current Balance is Rs." + this.balance + " Please note that Minimum balance in account should be Rs.5000";

      }
      else {
        this.transaction.mode = "RTGS"
        this.transaction.paid_to_acc_num = this.RtgsForm.value.to_account_number;
        this.transaction.from_acc_num = this.account_number;
        this.transaction.amount = this.RtgsForm.value.amount;
        this.transaction.tax = 0;
        this.transaction.trans_time = this.formatDate(this.transaction_date);
        this.transaction.tran_status = "Pending";
        this.transaction.remark = this.RtgsForm.value.remark;
        this.debit=this.transaction.amount;
        this.error = false;
        this.success = true;
        this.message = "You can proceed further";
        console.log(this.transaction);

      }
    }
    else {
      this.error = true;
      this.success = false;
      this.message = "Valid"
    }
  }
  formatDate(date: any) {
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
  AddBeneficiary() {
    this.route.navigate(["/userdashboard/Fund-Transfer/add-beneficiary"])
  }

  addTransaction(obj: any) {
    this.service.addTransaction(obj).subscribe(
      data => {
        debugger
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
  beneficiary_list: any

  ngOnInit(): void {
    this.service.getBeneficiaries(this.account_number).subscribe(
      data => {
        debugger
        this.beneficiary_list = data
      }
    )
  }

  continue = false
  Continue() {
    this.continue = true
    console.log("You are here")
  }

  transaction_password: string
  password_error: string
  password_success: string

  checkTransPassword(acc_num: number, password: string) {
    this.service.checkTransactionPassword(acc_num, password).subscribe(
      data => {
        if (data == "Error") {
          this.password_success = null;
          this.password_error = "Error : you have Entered Wrong Password";
        }
        else {
          this.password_error = null
          this.password_success = "You have entered correct password!!"
          if (this.transaction.trans_time == this.formatDate(this.currentDate)) {
            this.transaction.tran_status = "Done";
            this.updateBalance(this.account_number,this.RtgsForm.value.to_account_number,this.debit);
            this.addTransaction(this.transaction);
          }
          else {
            this.addTransaction(this.transaction);
          }
        }
      }
    )

  }
  CheckPassword() {
    if (this.transaction_password == undefined || this.transaction_password == "") {
      this.password_success = null
      this.password_error = "Error : you have not Entered Password"
    }
    else {
      this.password_error = null
      this.checkTransPassword(this.account_number, this.transaction_password);
    }
  }
}