import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/Admin';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  admin_id
  custpending:any=[];
  custalloted:any=[];

  

  constructor(private router:Router,private adminService:AdminService) {
    this.admin_id=sessionStorage.getItem('admin_id')
    this.fetchCustDetails();
    this.fetchAllotedDetails();
    
   }


  logout(){
    sessionStorage.clear();
    this.router.navigate(["/"]);

  }
  
  fetchCustDetails()
  {
    this.custpending=this.adminService.getCustDetails().subscribe((data)=>
    {this.custpending=data})
  }

  fetchAllotedDetails()
  {
    this.custalloted=this.adminService.getAllotedCustDetails(this.admin_id).subscribe((data)=>
    {this.custalloted=data})
  }



  ngOnInit(): void {
  }

}
