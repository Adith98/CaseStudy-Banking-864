import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class TransactionServices{
    private baseUrl = "https://localhost:44342";
    header : any;  

    constructor(private http:HttpClient){
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings);
    }

    getBeneficiaries(acc_num:number){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.baseUrl+"/api/Transactions/getBeneficiaries?account_number="+acc_num,httpOptions)
    }

    addTransaction(obj:any){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.baseUrl+'/api/Transactions', obj, httpOptions)  
    }

    checkTransactionPassword(account_number:number,password:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.baseUrl+"/api/CheckTransactionPassword?account_number="+account_number+"&transaction_password="+password,httpOptions)
    }
    
    getTransactionReceipt(transaction_id:number){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.get<any>(this.baseUrl+"/api/Transactions/"+transaction_id,httpOptions)
    }

    updateBalance(account_number:number,to_account_number:number,debit:number){
        const httpOptions={headers:new HttpHeaders({'Content-Type':'application/json'})};
        return this.http.put<any>(this.baseUrl+"/api/UpdateCurrentBalance?from_account_number="+account_number+"&to_account_number="+to_account_number+"&debit="+debit,httpOptions)
    }
}