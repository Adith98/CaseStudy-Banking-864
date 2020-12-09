import { Injectable } from "@angular/core";
import {CanActivate, Router} from "@angular/router";


@Injectable()
export class CheckLoginGuard implements CanActivate{

    constructor(public router:Router){}

    canActivate() {
        if(sessionStorage.getItem('user-logged-in')){
            return true;
        }
        else{
            this.router.navigate(['/Home'])
            return false;
        }

      }
}

@Injectable()
export class CheckAdminGuard implements CanActivate{
    constructor(public router:Router){}

    canActivate() {
        if(sessionStorage.getItem('admin-logged-in')){
            return true;
        }
        else{
            this.router.navigate(['/Home'])
            return false;
        }

      }
}

@Injectable()
export class CheckTypeGuard implements CanActivate{
    constructor(public router:Router){}

    canActivate(){
        if(sessionStorage.getItem('type')){
            return true;
        }
        else{
            this.router.navigate(['/Home'])
            return false;
        }
    }
}

@Injectable()
export class CheckNotLogin implements CanActivate{
    constructor(public router:Router){}

    canActivate(){
        if(sessionStorage.getItem('user-logged-in')){
            this.router.navigate(['/userdashboard'])
            return false;
        }
        else if(sessionStorage.getItem('admin-logged-in')){
            this.router.navigate(['/Admin-dashboard'])
            return false;
        }
        else{
            return true;
        }
    }
}