import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/Admin';

@Component({
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.css']
})
export class PendingApprovalComponent implements OnInit {

  admin_id=sessionStorage.getItem('admin_id')
  custpending:any=[];
  constructor(private adminService:AdminService) { }


  ngOnInit(): void {
    this.fetchCustDetails();
  }

  fetchCustDetails()
  {
    this.custpending=this.adminService.getCustDetails().subscribe((data)=>
    {this.custpending=data})
  }

  AllotToMe(cust_id:number)
  {
    this.custpending=this.adminService.AllotToMe(cust_id,this.admin_id).subscribe((data)=>
    {this.fetchCustDetails()}
    )
  }
}
