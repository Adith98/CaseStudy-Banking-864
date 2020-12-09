import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/Admin';

@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {

  admin_id=sessionStorage.getItem('admin_id')
  //cust_id="1003"
  cust_id:string
  id:number
  custdetails: any = [];
  custaddress: any = [];
  message: string;
  status: string;
  constructor(private service:AdminService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    debugger
    this.route.paramMap.subscribe(params => { 
      this.cust_id = params.get('id'); 
      this.id = + this.cust_id
  });
    this.fetchCustomer();
    this.fetchCustomerAddress();
  }

  fetchCustomer() {
    this.custdetails = this.service.getCustomer(this.cust_id).subscribe((data) => {
      this.custdetails = data;
      console.log(data)
    })
  }

  fetchCustomerAddress() {
    this.custaddress = this.service.getCustomerAdd(this.cust_id).subscribe((dataa) => {
      this.custaddress = dataa;
      console.log(dataa)
    })
  }


  SendStatus(id: number, mes: string) {
    this.service.customerStatus(id, mes).subscribe((data) => {
      debugger;
      this.status = data
      if(data=="Done"){
        this.router.navigate(["/Admin-dashboard/Alloted-To-Me"])
      }
      else{
        alert(data.exception_message)
      }
    }
    )
  }



  Accept() {
    debugger;
    this.message = "Approved";
    this.SendStatus(this.id, this.message);
  }
  Reject()
  {
    debugger;
    this.message="Rejected";
    this.SendStatus(this.id,this.message);
  }

}
