import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/Admin';

@Component({
  selector: 'app-alloted-to-me',
  templateUrl: './alloted-to-me.component.html',
  styleUrls: ['./alloted-to-me.component.css']
})
export class AllotedToMeComponent implements OnInit {

  admin_id=sessionStorage.getItem('admin_id')
  custalloted:any=[];
  constructor(private service:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.fetchCustDetails();
  }

  ViewDetails(cust_id:string){
    this.router.navigate(["/Admin-dashboard/Aprroval-Page",cust_id])
    console.log(cust_id)
  }
  
  fetchCustDetails()
  {
    this.custalloted=this.service.getAllotedCustDetails(this.admin_id).subscribe((data)=>
    {this.custalloted=data})
  }

}
