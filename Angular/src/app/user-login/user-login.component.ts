import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../service/accountLogin';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form:FormGroup
  account_locked=false
  constructor(private service:UserLogin,private router: Router,) {
    this.form= new FormGroup({
      userid: new FormControl(null,[Validators.required]),
      login_password: new FormControl(null,[Validators.required])
    })
   }
   error:any;
   sendDetails(userid:number,login_password:string){
     this.service.login(userid,login_password).subscribe(
       data=>{
         debugger;
        if(data =="Wrong Password"){
          this.error="Wrong Password"
        }
        else if(data =="Invalid User id"){
          this.error="Invalid User id"
        }
        else if(data =="Failed after 3 unsuccessful login attempts"){
          this.error="Failed after 3 unsuccessful login attempts. Your Account has been locked!."
          this.account_locked=true;
        }
        else if(data =="Account Already Locked!"){
          this.form.reset()
          this.error="Account Already Locked!"
          this.account_locked=true;
        }
        else if(data =="First Login"){ 
          this.error = "First Login" 
          sessionStorage.setItem('userid',this.form.value.userid)
          sessionStorage.setItem('net-banking',"true")
          sessionStorage.setItem('user-logged-in',"true")
          this.form.reset()
          this.account_locked=false;
          this.router.navigate(["/new-password"])
        }
        else if(data=="First Login Without Net Banking"){
          this.error = "First Login" 
          sessionStorage.setItem('userid',this.form.value.userid)
          sessionStorage.setItem('user-logged-in',"true")
          this.form.reset()
          this.account_locked=false;
          this.router.navigate(["/new-login-password"])
        }
        else if(data=="Success"){
          this.error = "Success"          
          sessionStorage.setItem('userid',this.form.value.userid)
          sessionStorage.setItem('user-logged-in',"true")
          sessionStorage.setItem('net-banking',"true")
          this.form.reset()
          this.account_locked=false;
          this.router.navigate(["/userdashboard"])   
        }
        else if(data=="Success Without Net Banking"){
          sessionStorage.setItem('userid',this.form.value.userid)
          sessionStorage.setItem('user-logged-in',"true")
          this.form.reset()
          this.account_locked=false;
          this.router.navigate(["/userdashboard"])   
       }
      }
     );
   }

   onSubmit(){
     if(this.form.valid){
       this.sendDetails(this.form.value.userid,this.form.value.login_password);
     }else{
       alert("error")
     }
   }
  ngOnInit(): void {
  }

}
