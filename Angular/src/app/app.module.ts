import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AdminService } from './service/Admin';
import { TransactionServices } from './service/transaction';
import { CheckAdminGuard, CheckLoginGuard, CheckNotLogin, CheckTypeGuard } from './service/RouteGuardService';


import { AccountLogin, UserLogin } from './service/accountLogin';
import { RegistrationServices } from './service/registration';
import { LoginAccountComponent } from './login-account/login-account.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotLoginPasswordComponent } from './forgot-login-password/forgot-login-password.component';
import { ForgotService } from './service/forgotService';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { ChangeLoginPasswordComponent } from './change-login-password/change-login-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PendingApprovalComponent } from './pending-approval/pending-approval.component';
import { AllotedToMeComponent } from './alloted-to-me/alloted-to-me.component';
import { AdminApprovalComponent } from './admin-approval/admin-approval.component';
import { NeftTransferComponent } from './neft-transfer/neft-transfer.component';
import { TransactionReceiptComponent } from './transaction-receipt/transaction-receipt.component';
import { RtgsTransferComponent } from './rtgs-transfer/rtgs-transfer.component';
import { ImpsTransferComponent } from './imps-transfer/imps-transfer.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountStatementComponent } from './account-statement/account-statement.component';
import { InternetBankingComponent } from './internet-banking/internet-banking.component';
import { AccountSummary } from './service/AccountHolder';
import { NetBanking } from './service/net-banking';
import { FundTransferComponent } from './fund-transfer/fund-transfer.component';
import { BeneficiaryComponent } from './beneficiary/beneficiary.component';
import { BeneficiaryService } from './service/beneficiaryService';
import { UpdateCustomerDetailsComponent } from './update-customer-details/update-customer-details.component';
import { CheckstatusComponent } from './checkstatus/checkstatus.component';
import { ChangeTransactionPasswordComponent } from './change-transaction-password/change-transaction-password.component';
import { NewLoginPasswordComponent } from './new-login-password/new-login-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginAccountComponent,
    RegistrationComponent,
    ForgotLoginPasswordComponent,
    EnterOtpComponent,
    ChangeLoginPasswordComponent,
    AdminDashboardComponent,
    PendingApprovalComponent,
    AllotedToMeComponent,
    AdminApprovalComponent,
    NeftTransferComponent,
    TransactionReceiptComponent,
    RtgsTransferComponent,
    ImpsTransferComponent,
    HomeComponent,
    UserLoginComponent,
    UserDashboardComponent,
    AccountDetailsComponent,
    AccountSummaryComponent,
    AccountStatementComponent,
    InternetBankingComponent,
    FundTransferComponent,
    BeneficiaryComponent,
    UpdateCustomerDetailsComponent,
    CheckstatusComponent,
    ChangeTransactionPasswordComponent,
    NewLoginPasswordComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AdminService, TransactionServices, AccountLogin, UserLogin, AccountSummary, RegistrationServices, ForgotService, NetBanking, BeneficiaryService, CheckLoginGuard, CheckAdminGuard, CheckTypeGuard,CheckNotLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
