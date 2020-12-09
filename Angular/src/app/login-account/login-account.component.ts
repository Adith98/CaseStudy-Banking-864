import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountLogin } from '../service/accountLogin';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.css']
})
export class LoginAccountComponent implements OnInit {

  LoginAccountGroup:FormGroup
  
  constructor(private service:AccountLogin,private router:Router) {
    this.LoginAccountGroup= new FormGroup({
      admin_id: new FormControl(null,[Validators.required,Validators.pattern("\\d*")]),
      password: new FormControl(null,[Validators.required])
    })
   }
   
   error:any
   errorExists=false

   sendDetails(acc_num:number,password:string){
     this.service.login(acc_num,password).subscribe(
       data=>{
        if(data =="Wrong Password"){
          this.error="Wrong Password"
          this.errorExists=true
        }
        else if(data =="Invalid Admin Id"){
          this.error="Invalid Admin Id"
          this.errorExists=true
        }
        else if(data=="Success"){
          sessionStorage.setItem('admin_id',this.LoginAccountGroup.value.admin_id)
          sessionStorage.setItem('admin-logged-in',"true")
          this.router.navigate(["/Admin-dashboard"]);

          this.error = "Success"
          this.LoginAccountGroup.reset()
        }
        
       }
     );
   }

   LoginAccount(){
     if(this.LoginAccountGroup.valid){
       this.sendDetails(this.LoginAccountGroup.value.admin_id,this.LoginAccountGroup.value.password);
     }else{
      this.errorExists=true
      this.error="Error with entered details"
     }
   }
  ngOnInit(): void {
  }

}
