import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class RegistrationServices{
    private baseUrl = "https://localhost:44342";
    header : any;  

    constructor(private http:HttpClient){
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings);
    }

    getCustomers(){
        return this.http.get(this.baseUrl+"/api/CustomerDetails")
    }


    register(obj:any){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.baseUrl+'/api/Register', obj, httpOptions)  
    }

    update(userid:number,obj:any){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.put<any>(this.baseUrl+'/api/UpdateCustDetail?user_id='+userid, obj, httpOptions) 
    }

    generateSRN(obj:any){
        debugger
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.baseUrl+'/api/AddApproval', obj, httpOptions)  
    }

    getCustomerStatus(srn:number)
    {
     debugger;
     const httpOptions={headers:new HttpHeaders({'content-type':'application/json'})};
     return this.http.get<any>(this.baseUrl+"/api/getstatus/?srn="+srn,httpOptions);
    }
}