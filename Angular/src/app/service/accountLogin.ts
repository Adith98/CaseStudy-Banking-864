import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class AccountLogin{
    header : any; 
    baseUrl="https://localhost:44342" 
    constructor(private http:HttpClient){
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings);
    }


    login(admin_id:number,password:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
        return this.http.post<any>(this.baseUrl+"/api/Login?admin_id="+admin_id+"&password="+password,httpOptions)
    }
}

@Injectable()
export class UserLogin{
    header : any;
    baseUrl="https://localhost:44342"  
    constructor(private http:HttpClient){
        const headerSettings: {[name: string]: string | string[]; } = {};  
        this.header = new HttpHeaders(headerSettings);
    }
    

    login(userid:number,login_password:string){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }; 
        return this.http.post<any>(this.baseUrl+"/api/userLogin?userid="+userid+"&login_password="+login_password,httpOptions)
    }
}