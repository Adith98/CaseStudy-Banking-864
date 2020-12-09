import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BeneficiaryService } from '../service/beneficiaryService';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css']
})
export class BeneficiaryComponent implements OnInit {
  form: FormGroup;
  userid: number = +sessionStorage.getItem("userid");
  account_number=+sessionStorage.getItem("account_number")
  beneficiary:any={};
  b_account_number;
  message;
  final_b_account_number;
  valid=false;
  error;

  constructor(private beneficiaryservice:BeneficiaryService,private route:Router ) {
    this.form = new FormGroup({
      nickname: new FormControl(null, [])
    });
  }



  AddBeneficiary(beneficiary:any)
  {
    this.beneficiaryservice.AddBenefeciaries(beneficiary).subscribe(
      data=>{
        debugger
        if(data=="Exists"){
          this.valid=false;
          this.error="Beneficiary Account Number already added."
        }
        else if(data=="Same"){
          this.valid=false;
          this.error="Cannot add yourself as your beneficiary."
        }
        else if(data=="Okay"){
          this.error=="Beneficiary Added Successfully."
          this.route.navigate(['/userdashboard/Fund-Transfer'])
        }
        else{
          this.valid=false;
          alert(data)
        }
      }
    )

  
  }
  

  BeneficiarySubmit() {
    if(this.form.valid)
    {
      this.beneficiary.account_number=this.account_number;
      this.beneficiary.b_account_number=this.final_b_account_number;
      this.beneficiary.nickname=this.form.value.nickname;
      this.AddBeneficiary(this.beneficiary);
      console.log(this.beneficiary);
    }
    else{
      console.log("Error");
    }
  }



Check()
{
  debugger
  if(this.b_account_number=="" || this.b_account_number==undefined){
    this.message="You have not added an account number"
  }
  else{
    this.beneficiaryservice.getBeneficiaryName(this.b_account_number).subscribe(
      data=>{
        if(data!="Incorrect Account number")
        {
          this.valid=true;
          this.final_b_account_number=this.b_account_number;
          this.message="Valid Account Number. Name of the Account holder: "+data
        }
        else{
          this.valid=false;
          this.message="Invalid account number"
        }
        
      }
    )
  } 
}


  ngOnInit(): void {
  }
}