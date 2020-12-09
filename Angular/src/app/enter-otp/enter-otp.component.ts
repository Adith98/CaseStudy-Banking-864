import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotService } from '../service/forgotService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enter-otp',
  templateUrl: './enter-otp.component.html',
  styleUrls: ['./enter-otp.component.css']
})
export class EnterOtpComponent implements OnInit {

  type=sessionStorage.getItem('type')
  user_id_sent=false
  receivedOtp:string
  message:string
  required_detail=sessionStorage.getItem('required_detail')
  resend=false;

  EnterOtp:FormGroup
  constructor(private service:ForgotService,private router:Router) {
    this.EnterOtp= new FormGroup({
      otp:new FormControl(null,[Validators.required,Validators.pattern("\\d*")])
    })
   }
 
  checkOtp(receivedOtp:string,required_detail:string){
    this.service.checkOtp(receivedOtp,required_detail).subscribe(
      data=>{
        debugger;

        if(data=="OTP does not match"){
          this.message="OTP does not match"
          this.resend=true
        }
        else{
          if(sessionStorage.getItem('acc_num')){
            this.service.sendUserId(required_detail).subscribe(
              data=>{
                sessionStorage.removeItem('acc_num')
                debugger;
                console.log(data);
                this.user_id_sent=true;
              }
            )
          }
          else if(sessionStorage.getItem('trans-password')){
            sessionStorage.removeItem('trans-password')
            this.router.navigateByUrl("change-transaction-password");
          }
          else{
            this.router.navigateByUrl("change-password");
          } 
        }
      }
    )
  }

  Resend(){
    this.service.sendOtp(this.type,this.required_detail).subscribe(
      data=>{
        debugger;

        if(data=="Does Not Exist"){
          this.message="Does Not Exist"
        }
        else{
          this.EnterOtp.reset;
          this.resend=false;
          this.message="";
          this.router.navigateByUrl("enter-otp");
        }
      }
    )
  }

  enterOtp(){
    if(this.EnterOtp.valid){
      this.receivedOtp=this.EnterOtp.value.otp  
      this.checkOtp(this.receivedOtp,this.required_detail)
    }else{
      alert("error")
    }

  }

  id:any;
  ngOnInit(): void {

  }

}
