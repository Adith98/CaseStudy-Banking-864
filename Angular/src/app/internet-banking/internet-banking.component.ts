import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../service/must_match.validator'
import { NetBanking } from '../service/net-banking'

@Component({
  selector: 'app-internet-banking',
  templateUrl: './internet-banking.component.html',
  styleUrls: ['./internet-banking.component.css']
})
export class InternetBankingComponent implements OnInit {


  form: FormGroup
  error: any;
  constructor(private formBuilder: FormBuilder, private service: NetBanking,private route:Router) {
  }

  sendDetails(account_number: number, login_password: string, transaction_password: string) {
    debugger
    this.service.netbank(account_number, login_password, transaction_password).subscribe(
      data => {
        debugger;
        if(data=="Does not Exist"){
          this.error = "Account Number Does Not Exist"
        }
        else{
          this.error="Successfully Changed the Password!"
          this.form.reset()
          this.route.navigate(["/userLogin"])
        }  
          
      }
    );
  }


  ngOnInit() {

    this.form = this.formBuilder.group({
      account_number: [null, Validators.required],
      login_password: [null, [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      confirm_login_password: [null, Validators.required],
      transaction_password: [null, [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]],
      confirm_transaction_password: [null, Validators.required]
    }, {
      validator: [MustMatch('login_password', 'confirm_login_password'), MustMatch('transaction_password', 'confirm_transaction_password')]

    },

    );
  }




  onSubmit() {

    if (this.form.valid) {
      debugger
      this.sendDetails(this.form.value.account_number, this.form.value.login_password, this.form.value.transaction_password);
    } else {
      alert("error")
    }

  }
}


