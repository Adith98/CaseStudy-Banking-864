import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ForgotService{
    header : any;  
    constructor(private http:HttpClient){
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings);
    }
    baseUrl="https://localhost:44342"

    sendOtp(type:string,required_detail:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
        return this.http.post<any>(this.baseUrl+"/api/sendOtp?type="+type+"&required_detail="+required_detail,httpOptions)
    }

    checkOtp(receivedOTP:string,required_detail:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
        return this.http.post<any>(this.baseUrl+"/api/checkOtp?receivedOTP="+receivedOTP+"&required_detail="+required_detail,httpOptions)
    }

    changeLoginPassword(user_id:string,password:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
        return this.http.put<any>(this.baseUrl+"/api/UpdateLoginPassword?user_id="+user_id+"&password="+password,httpOptions)
    }

    changeTransactionPassword(user_id:string,password:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
        return this.http.put<any>(this.baseUrl+"/api/UpdateTransactionPassword?user_id="+user_id+"&password="+password,httpOptions)
    }

    sendUserId(account_number:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<any>(this.baseUrl+"/api/sendUserId?account_number="+account_number,httpOptions) 
    }   
}