import{HttpClient, HttpClientModule}from '@angular/common/http';
import{Injectable}from '@angular/core';
import{HttpHeaders} from '@angular/common/http';
import {NgForm}from '@angular/forms';

@Injectable()
export class AdminService
{
    header:any;
    baseUrl:string;
    constructor(private http:HttpClient,private http1:HttpClient,private http2:HttpClient)
    {
        const headerSettings:{[name:string]:string|string[];}={};
        this.baseUrl="https://localhost:44342"
        this.header=new HttpHeaders(headerSettings);
    }

    //Pending Details

    getCustDetails()
    {
        //debugger;
        return this.http.get(this.baseUrl+"/api/pending");
    }

    getAllotedCustDetails(admin_id:string)
    {
        return this.http1.get(this.baseUrl+"/api/alloted/"+admin_id);
    }

    AllotToMe(cust_id:number,admin_id:string)
    {
        const httpOptions={headers:new HttpHeaders({'Content-Type':'application/json'})};
        return this.http2.put<any>(this.baseUrl+"/api/allot_to_me?cust_id="+cust_id+"&allotted_to="+admin_id,httpOptions);
    }


    getCustomer(cust_id:string)
    {
        //debugger;
        return this.http.get(this.baseUrl+"/api/getCust?cust_id="+cust_id);
    }
    getCustomerAdd(cust_id:string)
    {
        //debugger;
        return this.http.get(this.baseUrl+"/api/getAdd?cust_id="+cust_id);
    }
   
    //Approve Button
    customerStatus(id:number,mes:string)
    {
       const httpOptions={headers:new HttpHeaders({'content-type':'application/json'})};
       return this.http1.put<any>(this.baseUrl+"/api/approve?id="+id+"&message="+mes,httpOptions);
    }
    
}