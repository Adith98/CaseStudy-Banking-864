import { Component, OnInit } from '@angular/core';
import { RegistrationServices } from '../service/registration';

@Component({
  selector: 'app-checkstatus',
  templateUrl: './checkstatus.component.html',
  styleUrls: ['./checkstatus.component.css']
})
export class CheckstatusComponent implements OnInit {

  srn
  constructor(private approvalservice: RegistrationServices) { }

  ngOnInit(): void {
  }

  fetchCustomer(srn:number) {
    this.approvalservice.getCustomerStatus(srn).subscribe((data) => {
      debugger;
      if(data=="Does Not Exist"){
        this.exists=false
        this.error=true;
        this.error_message="Entered SRN does not exist"
      }
      else{
        this.exists=true
        this.srn = data
        console.log(this.srn)
      }
    })
  }

  exists=false
  error=false
  error_message=""
  Search(srnno:string)
  {
    if(srnno==""){
      this.exists=false
      this.error=true
      this.error_message="You need to Enter a SRN"
    }
    else if(!(Number(srnno)<100000000 && Number(srnno)>999999)){
      this.exists=false
      this.error=true
      this.error_message="Entered SRN does not exist"
    }
    else{
      this.error=false
      this.fetchCustomer(Number(srnno));
    }

  }

}
