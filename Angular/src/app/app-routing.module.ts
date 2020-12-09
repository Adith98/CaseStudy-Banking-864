import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AllotedToMeComponent } from './alloted-to-me/alloted-to-me.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { ChangeLoginPasswordComponent } from './change-login-password/change-login-password.component';
import { ChangeTransactionPasswordComponent } from './change-transaction-password/change-transaction-password.component';
import { CheckstatusComponent } from './checkstatus/checkstatus.component';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { ForgotLoginPasswordComponent } from './forgot-login-password/forgot-login-password.component';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { HomeComponent } from './home/home.component';
import { ImpsTransferComponent } from './imps-transfer/imps-transfer.component';
import { InternetBankingComponent } from './internet-banking/internet-banking.component';
import { LoginAccountComponent } from './login-account/login-account.component';
import { NeftTransferComponent } from './neft-transfer/neft-transfer.component';
import { NewLoginPasswordComponent } from './new-login-password/new-login-password.component';
import { PendingApprovalComponent } from './pending-approval/pending-approval.component';
import { RegistrationComponent } from './registration/registration.component';
import { RtgsTransferComponent } from './rtgs-transfer/rtgs-transfer.component';
import { CheckAdminGuard, CheckLoginGuard, CheckNotLogin, CheckTypeGuard } from './service/RouteGuardService';
import { TransactionReceiptComponent } from './transaction-receipt/transaction-receipt.component';
import { UpdateCustomerDetailsComponent } from './update-customer-details/update-customer-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './user-login/user-login.component';


const routes: Routes = [
  {path:"Home",component:HomeComponent},
  {path:"registration",component:RegistrationComponent},
  
  {path:"Admin-login",component:LoginAccountComponent,canActivate: [CheckNotLogin]},
  {path:"userLogin",component:UserLoginComponent,canActivate: [CheckNotLogin]},
  {path:"track-status",component:CheckstatusComponent,canActivate: [CheckNotLogin]},
  {path:"forgot/:id",component:ForgotLoginPasswordComponent},

  {path:"enter-otp",component:EnterOtpComponent,canActivate: [CheckTypeGuard]},
  {path:"change-password",component:ChangeLoginPasswordComponent,canActivate: [CheckTypeGuard]},
  {path:"change-transaction-password",component:ChangeTransactionPasswordComponent,canActivate: [CheckTypeGuard]},

  {
    path:"userdashboard",
    component:UserDashboardComponent,
    canActivate: [CheckLoginGuard],
    children:[
      {
        path:"Account-Details",
        component:AccountDetailsComponent
      },
      {
        path:"Update-Details",
        component:UpdateCustomerDetailsComponent
      },
      {
        path:"Account-Summary",
        component:AccountSummaryComponent
      },
      {
        path:"Account-Statement",
        component:AccountStatementComponent
      },
      {
        path:"Fund-Transfer",
        component:FundTransferComponent,
        children:[
          {path:"add-beneficiary",component:BeneficiaryComponent},
          {path:"neft-transfer",component:NeftTransferComponent},
          {path:"rtgs-transfer",component:RtgsTransferComponent},
          {path:"imps-transfer",component:ImpsTransferComponent},
        ]
      }
    ]
  },
  {path:"transaction-receipt/:reference_id",component:TransactionReceiptComponent,canActivate: [CheckLoginGuard]},
  {path:"new-password",component:InternetBankingComponent,canActivate: [CheckLoginGuard]},
  {path:"new-login-password",component:NewLoginPasswordComponent,canActivate: [CheckLoginGuard]},


  {
    path:"Admin-dashboard",
    component:AdminDashboardComponent,
    canActivate: [CheckAdminGuard],
    children:[
      {
        path:"Pending-Allotments",
        component:PendingApprovalComponent
      },
      {
        path:"Alloted-To-Me",
        component:AllotedToMeComponent
      },
      {
        path:"Aprroval-Page/:id",
        component:AdminApprovalComponent
      }
    ]
  },


  {path:'',redirectTo:'Home',pathMatch:'full'},
  { path: '**', redirectTo: 'Home',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
