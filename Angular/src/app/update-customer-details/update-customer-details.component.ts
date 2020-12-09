import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {RegistrationServices} from '../service/registration';
import { AccountSummary } from '../service/AccountHolder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-customer-details',
  templateUrl: './update-customer-details.component.html',
  styleUrls: ['./update-customer-details.component.css']
})
export class UpdateCustomerDetailsComponent implements OnInit {

  obj:any={}
  userid: number = +sessionStorage.getItem("userid");
  userdetails:any={};
  useraddress:any=[];
  notsame=false
  type_of_address:string
  perm_add:any={}
  resi_add:any={}


  constructor(private service:RegistrationServices, private service1:AccountSummary,private route:Router) {  
    this.fetchCustomer();
    this.fetchCustomerAddress();
  }

  
  updation_done=false
  updateCust(obj:any){
    this.service.update(this.userid,obj).subscribe(
      data=>{
        debugger;
        if(data.message=="Okay"){          
          this.updation_done=true
          this.route.navigate(["/userdashboard/Account-Details"])
        }
        else if(data.message=="Exception"){
          this.updation_done=false
          alert(data.exception_message)
        }
      }
    )
  }


  fetchCustomerAddress() {
    this.service1.getCustomerAdd(this.userid).subscribe((data) => {
      this.useraddress = data;
      var count=0
      for(var item in this.useraddress){
        count+=1
        this.type_of_address="Yes"
      }
      if(count==2){
        console.log("Yes")
        this.type_of_address="No"
        this.notsame=true
        this.perm_add=this.useraddress[0]
        this.resi_add=this.useraddress[1]
      }
      else{
        this.perm_add=this.useraddress[0]
      }
    })
  }

  fetchCustomer() {
    this.service1.getCustomer(this.userid).subscribe((data) => {
      this.userdetails = data;
      console.log(this.userdetails)
    })
  }

  debit_card:any
  approval:any={}
  rand:number
  data


  update(update:NgForm){
    if(update.valid){
      var dob = new Date(update.value.dob)
      var currentDate = new Date()

      if(currentDate.getFullYear() - dob.getFullYear() <= 18){
        alert("Age Should Be greater Than 18")
      }
      else{
        this.obj = update.value
        this.obj.type_of_address = this.type_of_address
        this.obj.cust_id = this.userdetails.cust_id
        this.obj.net_banking = this.userdetails.net_banking
        this.obj.pan_doc=this.userdetails.pan_doc
        this.obj.approval_status = "Approved"
        console.log(update.value)
        this.updateCust(this.obj)
      }
    }
    else{
      alert("Error")
    } 
  }

  /*
  register(){
    if(this.Registration.valid){
      this.obj.title = this.Registration.value.title
      this.obj.first_name=this.Registration.value.first_name
      this.obj.middle_name=this.Registration.value.middle_name
      this.obj.last_name=this.Registration.value.last_name
      this.obj.fathers_name=this.Registration.value.fathers_name
      this.obj.mobile_number=this.Registration.value.mobile_number
      this.obj.email=this.Registration.value.email
      this.obj.aadhar=this.Registration.value.aadhar
      this.obj.pan_card=this.Registration.value.pan_card
      this.obj.pan_doc=this.Registration.value.pan_doc
      this.obj.dob=this.Registration.value.dob
      this.obj.occupation_type=this.Registration.value.occupation_type
      this.obj.source_of_income=this.Registration.value.source_of_income
      this.obj.gross_annual_income=this.Registration.value.gross_annual_income
      this.obj.debit_card=this.Registration.value.debit_card
      this.obj.net_banking=this.Registration.value.net_banking
      this.obj.approval_status=this.Registration.value.approval_status

      this.obj.line1=this.Registration.value.line_1
      this.obj.line2=this.Registration.value.line_2
      this.obj.landmark=this.Registration.value.landmark
      this.obj.cust_state=this.Registration.value.state
      this.obj.city=this.Registration.value.city
      this.obj.pin_code=this.Registration.value.pin_code
      this.obj.type_of_address=this.Registration.value.type_of_address

      this.obj.line1_residential=this.Registration.value.line_1_residential
      this.obj.line2_residential=this.Registration.value.line_2_residential
      this.obj.landmark_residential=this.Registration.value.landmark_residential
      this.obj.cust_state_residential=this.Registration.value.state_residential
      this.obj.city_residential=this.Registration.value.city_residential
      this.obj.pin_code_residential=this.Registration.value.pin_code_residential


      console.log(this.obj)
      this.registerCust(this.obj)

    }else{
      alert("error")
    }
  }
  */
  Yes(){
    document.getElementById("Residential").style.display = "none"
    console.log("yes")
  }

  No(){
    document.getElementById("Residential").style.display = "block"
    console.log("No")
  }

  ngOnInit(): void {
  }


}
