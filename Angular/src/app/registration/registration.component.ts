import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {RegistrationServices} from '../service/registration';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  obj:any={}

  first_name:any
  middle_name:any
  Registration:FormGroup
  constructor(private service:RegistrationServices) { 
    this.Registration=new FormGroup({
      title:new FormControl(null,[Validators.required]),
      first_name:new FormControl(null,[Validators.required]),
      middle_name:new FormControl(null,[Validators.required]),
      last_name:new FormControl(null,[Validators.required]),
      fathers_name:new FormControl(null,[Validators.required]),
      mobile_number:new FormControl(null,[Validators.required,Validators.pattern('^[7-9]\\d{9}$')]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      aadhar:new FormControl(null,[Validators.required,Validators.pattern('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$')]),
      pan_card:new FormControl(null,[Validators.required,Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]),
      pan_doc:new FormControl(null,[Validators.required]),
      dob:new FormControl(null,[Validators.required]),
      line_1:new FormControl(null,[Validators.required]),
      line_2:new FormControl(null,[Validators.required]),
      landmark:new FormControl(null,[Validators.required]),
      state:new FormControl(null,[Validators.required]),
      city:new FormControl(null,[Validators.required]),
      pin_code:new FormControl(null,[Validators.required]),
      type_of_address:new FormControl(null),
      line_1_residential:new FormControl(null),
      line_2_residential:new FormControl(null),
      landmark_residential:new FormControl(null),
      state_residential:new FormControl(null),
      city_residential:new FormControl(null),
      pin_code_residential:new FormControl(null),
      occupation_type:new FormControl(null,[Validators.required]),
      source_of_income:new FormControl(null,[Validators.required]),
      gross_annual_income:new FormControl(null,[Validators.required]),
      debit_card:new FormControl(null,[Validators.required]),
      net_banking:new FormControl(null,[Validators.required]),
      approval_status:new FormControl('Pending')
    })
  }

  registration_done=false
  registerCust(obj:any){
    this.service.register(obj).subscribe(
      data=>{
        debugger;
        console.log(data);
        if(data.message=="Okay"){
          this.Registration.reset()
          this.registration_done=true
          this.generateSRN(data.cust_id);
        }
        if(data.message=="Exception"){
          alert("There was something Wrong in the Entered Details. " + data.exception_message)
        }
      }
    )
  }

  approval:any={}
  rand:number
  data
  generateSRN(cust_id:number){
      
      this.rand =+ ("" + Math.random()).substring(2, 10); 
      this.approval.cust_id = cust_id
      this.approval.srn = this.rand
      this.approval.alloted_to = null

    this.service.generateSRN(this.approval).subscribe(
      data=>{
        debugger;
        if(data.message=="Okay"){
          this.data=data.srn
        }
        
      }
      
    )
  }



  register(){
    if(this.Registration.valid){


      var dob = new Date(this.Registration.value.dob)
      var currentDate = new Date()

      if(currentDate.getFullYear() - dob.getFullYear() <= 18){
        alert("Age Should Be greater Than 18")
      }
      else{
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
      }
    }else{
      alert("There is some error in entered details")
    }
  }

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
