import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AccountSummary {
    header: any;
    constructor(private http: HttpClient) {
        const headerSettings: { [name: string]: string | string[]; } = {};
        this.header = new HttpHeaders(headerSettings);
    }

    baseUrl = "https://localhost:44342"


    useraccountsummary(userid: number) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.baseUrl + "/api/getAccHolderDetails?id=" + userid, httpOptions)
    }

    getCustomer(userid: number) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.baseUrl + "/api/getCustDetails?id=" + userid, httpOptions);
    }
    getCustomerAdd(userid: number) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.baseUrl + "/api/getCustAddress?id=" + userid, httpOptions)
    }

    transdetails(userid: number) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.baseUrl + "/api/getTopTransactions?id=" + userid, httpOptions);
    }

    transAlldetails(userid: number) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.baseUrl + "/api/getAllTransactions?id=" + userid, httpOptions);
    }
    

    transdatedetails(userid: number, startdate: string, enddate: string) {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get(this.baseUrl + "/api/getFilter?id=" + userid + "&startd=" + startdate + "&endd=" + enddate, httpOptions);
    }

    getLastLogin(userid:number){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.baseUrl + "/api/getLastLogin?userid=" + userid, httpOptions);
    }

}