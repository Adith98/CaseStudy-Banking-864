import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class NetBanking{
    header : any;  
    constructor(private http:HttpClient){
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings);
    }
    baseUrl="https://localhost:44342"
    netbank(account_number:number,login_password:string,transaction_password:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
        return this.http.put<any>(this.baseUrl+"/api/net-banking?account_number="+account_number+"&login_password="+login_password+"&transaction_password="+transaction_password,httpOptions)
    }
}

