import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForgotService } from '../service/forgotService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-login-password',
  templateUrl: './new-login-password.component.html',
  styleUrls: ['./new-login-password.component.css']
})
export class NewLoginPasswordComponent implements OnInit {

  user_id=sessionStorage.getItem('userid')
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
 
  changeLoginPassword(password:string){
    this.service.changeLoginPassword(this.user_id,password).subscribe(
      data=>{
        debugger;
        this.error=data;
        sessionStorage.removeItem('user-id')
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
        this.changeLoginPassword(this.ChangePassword.value.password)
      }
    }else{
      this.error="error"
    }

  }



  ngOnInit(): void {
  }
}
