import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotService } from '../service/forgotService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-login-password',
  templateUrl: './forgot-login-password.component.html',
  styleUrls: ['./forgot-login-password.component.css']
})
export class ForgotLoginPasswordComponent implements OnInit {

  id:string
  type:string
  required_detail:string
  message:string
  user_id_sent=false;

  ForgotLogin:FormGroup
  constructor(private service:ForgotService,private router:Router,private route:ActivatedRoute) {
    this.ForgotLogin= new FormGroup({
      required_detail:new FormControl(null,[Validators.required,Validators.pattern("\\d*")])
    })
   }
 
  sendOtp(required_detail:string){
    this.service.sendOtp(this.type,required_detail).subscribe(
      data=>{
        debugger;

        if(data=="Does Not Exist"){
          this.message=this.variable+" Does Not Exist"
        }
        else{
          if(this.type=="user_id"){
            sessionStorage.setItem('acc_num',required_detail)
            this.router.navigateByUrl("enter-otp");
          }
          else if(this.type=="login_password"){
            this.router.navigateByUrl("enter-otp");
          }
          else if(this.type=="transaction_password"){
            sessionStorage.setItem('trans-password','true')
            this.router.navigateByUrl("enter-otp");
          } 
        }
      }
    )
  }

  forgotLogin(){
    if(this.ForgotLogin.valid){
      this.required_detail=this.ForgotLogin.value.required_detail
      sessionStorage.setItem('required_detail',this.required_detail)
      sessionStorage.setItem('type',this.type) 
      this.sendOtp(this.required_detail)
    }else{
      alert("error")
    }

  }

  variable;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      if(this.id=="user-id"){
        this.variable="Account Number"
        this.type="user_id"
      }
      else if(this.id=="login-password"){
        this.variable="User Id"
        this.type="login_password"
      }
      else if(this.id=="transaction-password"){
        this.variable="User Id"
        this.type="transaction_password"
      }
      else{
        this.router.navigate(["/Home"])
      }
      console.log(this.id);
    });
  }

}
