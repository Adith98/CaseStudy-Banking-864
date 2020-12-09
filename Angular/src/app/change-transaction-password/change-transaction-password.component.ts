import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotService } from '../service/forgotService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-transaction-password',
  templateUrl: './change-transaction-password.component.html',
  styleUrls: ['./change-transaction-password.component.css']
})
export class ChangeTransactionPasswordComponent implements OnInit {

  user_id=sessionStorage.getItem('required_detail')
  //user_id="1233215"
  required_detail:string
  message:string
  error:string
  ChangePassword:FormGroup

  constructor(private service:ForgotService,private router:Router) {
    this.ChangePassword= new FormGroup({
      password:new FormControl(null,[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]),
      confirm_password:new FormControl(null,[Validators.required])
    })
   }
 
  changeTransactionPassword(password:string){
    this.service.changeTransactionPassword(this.user_id,password).subscribe(
      data=>{
        debugger;
        this.error=data;
        this.router.navigateByUrl("userLogin");
      }
    )
  }

  changePassword(){
    if(this.ChangePassword.valid){
      if(this.ChangePassword.value.password!=this.ChangePassword.value.confirm_password){
        this.error="Passwords Do Not Match"
      }else{
        this.error="success"
        this.changeTransactionPassword(this.ChangePassword.value.password)
      }
    }else{
      this.error="error"
    }

  }



  ngOnInit(): void {
  }

}
