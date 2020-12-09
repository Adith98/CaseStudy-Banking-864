create database Banking

use Banking
create table CustomerDetails(
user_id int IDENTITY(1000,1) Primary key,
title varchar(5),
first_name varchar(20) not null,
middle_name varchar(20),
last_name varchar(20),
fathers_name varchar(20),
mobile_number varchar(15) unique not null,
email varchar(100) unique,
aadhar bigint unique not null,
pan_card varchar(15) unique not null,
pan_doc varchar(max),
dob datetime not null,
occupation_type varchar(50),
source_of_income varchar(50),
gross_annual_income varchar(50),
debit_card bit not null,
net_banking bit not null,
approval_status varchar(20) not null
)

create table CustAddress(
user_id int references CustomerDetails(user_id),
type_of_address varchar(10) not null,
line1 varchar(75),
line2 varchar(75),
landmark varchar(75),
city varchar(25) not null,
cust_state varchar(25) not null,
pin_code int not null ,
primary key(user_id,type_of_address)
)

create table BankAdmin(
admin_id int primary key,
admin_password varchar(100)not null
)

create table Approval(
approval_id int IDENTITY(1,1) Primary key,
user_id int references CustomerDetails(user_id),
srn int unique not null,
alloted_to int references BankAdmin(admin_id)
)

create table AccountHolder(
account_number bigint IDENTITY(51000000000,1) primary key,
cust_id int not null,
user_id int references CustomerDetails(user_id),
login_password varchar(25) not null,
transaction_password varchar(25),
created_on datetime,
last_login datetime,
account_status varchar(20)
) 

create table AccountDetails(
account_number bigint references AccountHolder(account_number) primary key,
account_type varchar(20) not null,
current_balance decimal(10,3) not null ,
check(current_balance>=500.000)
)

create table Beneficiaries(
beneficiary_id int IDENTITY(100,1) primary key,
account_number bigint references AccountHolder(account_number) not null,
b_account_number bigint references AccountHolder(account_number) not null,
nickname varchar(20)
)

create table Transactions(
reference_id int IDENTITY(10000,1) primary key,
mode varchar(5) not null,
paid_to_acc_num bigint references AccountHolder(account_number) not null,
from_acc_num bigint references AccountHolder(account_number) not null,
amount decimal(10,3) not null,
tax decimal(10,3) not null,
trans_time datetime not null,
tran_status varchar(15) not null,
remark varchar(100)
)